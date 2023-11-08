export function genMetadata(tag: string, ecr: string) {
  const repoColonTag = `${ecr}:${tag}`;

  return { repoColonTag };
}
