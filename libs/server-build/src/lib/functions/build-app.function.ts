import { shell } from './shell.function';

export function buildApp(app: string, target: 'production' | 'staging') {
  try {
    shell(
      ['npx', 'nx', 'run', `${app}:build:${target}`, '--skip-nx-cache'].join(
        ' '
      )
    );
  } catch (e) {
    console.log(e);
  }
}
