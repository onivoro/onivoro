const npmOrgName = '@onivoro';
const npmUrlPrefix = `https://www.npmjs.com/package/${npmOrgName}/`;
const githubUrlPrefix = 'https://github.com/onivoro/';
const localRoot = '~/';

export class Package {
    constructor(
        public readonly packageName: string,
        public readonly status = 'released',
        public readonly repoName?: string,
        public readonly type = 'library',
    ) {}

    get repoUrl () {
        return `${githubUrlPrefix}${this.repoName || this.packageName}.git`;
    }

    get packageUrl () {
        return `${npmUrlPrefix}${this.packageName}`;
    }

    get localPath () {
        return `${localRoot}${this.repoUrl.replace('https://', '').replace('.git', '')}`;
    }

    get mkdirCmd () {
        return `mkdir -p ${this.localPath}`;
    }

    get cloneCmd () {
        return `cd ${this.localPath} && git clone ${this.repoUrl} .`;
    }

    get npmInitCmd () {
        return `cd ${this.localPath} && npm init -y`;
    }

    get json () {
        return `
        {
            "name": "@onivoro/${this.packageName}",
            "version": "0.0.1",
            "repository": {
              "url": "${this.repoUrl}"
            },
            "scripts": {
              "test": "jest",
              "build": "tsc -p tsconfig.json",
              "release": "rm -rf dist && npm run build && npm version minor && cp package.json dist && cd dist && npm publish --scope public"
            },
            "devDependencies": {
              "@types/jest": "^26.0.14",
              "@types/node": "^14.11.2",
              "jest": "^26.4.2",
              "ts-jest": "^26.4.1",
              "typescript": "^4.0.3"
            },
            "dependencies": {
              "rxjs": "^6.6.3"
            }
          }`;
    }
}
