import { generateAppMetadata } from '@onivoro/server-common';
import { shell } from './shell.function';

export function buildImage(project: string, repoColonTag: string) {
  const {app, platform} = generateAppMetadata(project);
  shell(
    [
      'docker',
      'build',
      '--build-arg',
      `APP=${app}`,
      '-f',
      `./docker/prod/${platform}/Dockerfile`,
      '-t',
      repoColonTag,
      '.',
    ].join(' ')
  );
}
