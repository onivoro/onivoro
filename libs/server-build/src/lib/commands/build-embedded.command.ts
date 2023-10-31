import { Command, Option } from 'nest-commander';
import { BuildEmbeddedService, IEmbeddedAppBuildInput } from '@onivoro/server-build';
import { AbstractCommand } from './abstract.command';

@Command({ name: BuildEmbedded.name })
export class BuildEmbedded extends AbstractCommand<IEmbeddedAppBuildInput> {

    async main(args: string[], params: IEmbeddedAppBuildInput): Promise<void> {

        await this.buildEmbeddedSvc.main(params);
    }

    constructor(private buildEmbeddedSvc: BuildEmbeddedService) {
        super(BuildEmbedded.name);
    }

    @Option({
        flags: '-a, --app [app]',
        description: 'App identifier as defined in workspace.json',
        required: true
    })
    parseApp(val?: string) {
        return val;
    }

    @Option({
        flags: '-b, --bucket [bucket]',
        description: 'Bucket in which to store the assets',
        required: true
    })
    parseBucket(val?: string) {
        return val;
    }

    @Option({
        flags: '-r, --region [region]',
        description: 'Region in which to store the assets',
        required: true
    })
    parseRegion(val?: string) {
        return val;
    }

    @Option({
        flags: '-s, --assetRoot [assetRoot]',
        description: 'Relative path to the root of the compiled assets',
        required: true
    })
    parseAssetRoot(val?: string) {
        return val;
    }

    @Option({
        flags: '-c, --omitAcl [omitAcl]',
        description: 'Whether to use acl public-read for S3 push',
        required: true
    })
    parseOmitAcl(val?: string) {
        return val && val?.toString() === 'true';
    }
}
