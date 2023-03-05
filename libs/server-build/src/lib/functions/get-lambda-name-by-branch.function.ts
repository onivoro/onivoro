export function getLambdaNameByBranch(app: string, branch: string) {
    return branch === 'main' ? app : `${app}-staging`;
}
