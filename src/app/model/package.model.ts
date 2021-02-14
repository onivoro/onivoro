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
        return `${githubUrlPrefix}${this.repoName || this.packageName}`;
    }

    get packageUrl () {
        return `${npmUrlPrefix}${this.packageName}`;
    }

    get lee () {
        return `${localRoot}${npmOrgName.replace('@', '')}/`;
    }

    get localPath () {
        return `${localRoot}${this.repoUrl.replace('https://', '')}`;
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
}
