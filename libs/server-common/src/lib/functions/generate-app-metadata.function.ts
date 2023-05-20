export function generateAppMetadata(project: string) {
  const [platform, app] = project.split('-')
  const appRoot = `apps/${platform}/${app}`;
  const assetPath = `${appRoot}/src/assets`;
  const packageJsonPath = `${appRoot}/package.json`;
  const swaggerJsonPath = `api-dox/${project}.json`;

  return { platform, app, assetPath, packageJsonPath, swaggerJsonPath};
}
