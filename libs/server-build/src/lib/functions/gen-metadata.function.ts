export function genMetadata(app: string, ecr: string, isProduction: boolean) {
  // const branch = stripNewLines(shell(`git branch --show-current`));
  const tag = isProduction ? app : `${app}-staging`;
  const repoColonTag = `${ecr}:${tag}`;

  return { repoColonTag };
}
