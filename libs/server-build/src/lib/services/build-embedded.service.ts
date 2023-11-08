import { readFile } from 'fs/promises';
import { S3Service } from '@onivoro/server-aws-s3';
import { extractAssetList } from '../functions/extract-asset-list.function';
import { IEmbeddedAppBuildOutput } from '../types/embedded-app-build-output.interface';
import { Injectable } from '@nestjs/common';
import { IEmbeddedAppBuildInput } from '../types/embedded-app-build-input.interface';
import { toCdnPath } from '../functions/to-cdn-path.function';
import { buildApp } from '../functions/build-app.function';

@Injectable()
export class BuildEmbeddedService {

    async main({ app, bucket, region, assetRoot, omitAcl }: IEmbeddedAppBuildInput): Promise<IEmbeddedAppBuildOutput> {

        buildApp(app, 'production');

        const jsAndCssAssets: string[] = await extractAssetList(assetRoot);
        const indexHtmlPath = `${assetRoot}/index.html`;
        const indexHtml = (await readFile(indexHtmlPath)).toString();

        const fileMappings = jsAndCssAssets.map(original => {
            const [name, hash, ext] = original.split('.');
            const key = `${app}/${name}.${ext}`;
            const modified = toCdnPath(bucket, region, app, name, ext);

            return {
                original,
                modified,
                key,
                ext,
                contentType: (ext === 'js' ? 'text/javascript' : 'text/css') as any
            };
        });

        const inline = false;

        let html = fileMappings.reduce((acc, { modified, original }) => acc.replace(original, inline ? modified : ''), indexHtml);

        const bootstrapScriptName = 'init';
        const bootstrapPath = toCdnPath(bucket, region, app, bootstrapScriptName, 'js');

        if (!inline) {
            const body = '</body>';
            html = html.replace(body, `<script src="${bootstrapPath}" type="module"></script>${body}`);
            html = html.replace(new RegExp('<script src="" type="module"></script>', 'g'), '');
            html = html.replace(new RegExp('<link rel="stylesheet" href="">', 'g'), '');

        }

        const ACL = omitAcl ? undefined : 'public-read';

        await Promise.all(fileMappings.map(async ({ contentType, original, key }) =>
            await this.s3Svc.upload({
                Bucket: bucket,
                ContentType: contentType,
                Body: await readFile(`${assetRoot}/${original}`, 'utf-8'),
                Key: key,
                ACL
            })
        ));

        await this.s3Svc.upload({ Bucket: bucket, ContentType: 'text/javascript', Body: this.getBootstrapScriptBody(region, bucket, app), Key: `${app}/${bootstrapScriptName}.js`, ACL });

        return { app, html, fileMappings };
    }

    getBootstrapScriptBody(region: string, bucket: string, app: string) {
        return `
        const loadConfig = {
            bucket: '${bucket}',
            region: '${region}',
            toLoad: {
                'script': {
                    '${app}': ['runtime.js', 'polyfills.js', 'main.js'],
                },
                'link': {
                    '${app}': ['styles.css']
                }
            }
        };

        Object.entries(loadConfig.toLoad).forEach((configs) => {
            const type = configs[0];
            const segregatedConfigs = configs[1];
            Object.entries(segregatedConfigs).forEach((segregatedConfig) => {
                const folder = segregatedConfig[0];
                const files = segregatedConfig[1];
                const prefix = \`https://s3.\${loadConfig.region}.amazonaws.com/\${loadConfig.bucket}\`;

                files.forEach(file => {
                    const element = document.createElement(type);
                    const path = \`\${prefix}/\${folder}/\${file}\`;

                    if (type === 'link') {
                        element.setAttribute('href', path);
                        element.setAttribute('rel', 'stylesheet');
                        document.head.appendChild(element);
                    } else if (type === 'script') {
                        element.setAttribute('src', path);
                        element.setAttribute('type', 'module');
                        document.head.appendChild(element);
                    }
                });
            });
        });

        const l = document.createElement('link');
        l.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');
        l.setAttribute('rel', 'stylesheet');
        document.head.appendChild(l);`;
    }

    constructor(private s3Svc: S3Service) { }
}
