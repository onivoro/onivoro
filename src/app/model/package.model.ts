const npmOrgName = '@onivoro';
const npmUrlPrefix = `https://www.npmjs.com/package/${npmOrgName}/`;
const githubUrlPrefix = 'https://github.com/onivoro/';

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
}
