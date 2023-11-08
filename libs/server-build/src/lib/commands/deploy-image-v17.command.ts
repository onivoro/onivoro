import { Command, Option } from 'nest-commander';
import { buildApp } from '../functions/build-app.function';
import { buildImage } from '../functions/build-image.function';
import { copyPackageJsonVersion } from '../functions/copy-package-json-version.function';
import { genMetadata } from '../functions/gen-metadata.function';
import { logElapsedTime } from '../functions/log-elapsed-time.function';
import { loginToEcr } from '../functions/login-to-ecr.function';
import { pushImageToEcr } from '../functions/push-image-to-ecr.function';
import { stopAllTasks } from '../functions/stop-all-tasks.function';
import { IAwsEcsParams } from '../types/aws-ecs-params.interface';
import { AbstractAwsEcsCommand } from './abstract-aws-ecs.command';

type IParams = IAwsEcsParams & { target: string, appRoot: string, suffix: string };

@Command({ name: DeployImageV17.name })
export class DeployImageV17 extends AbstractAwsEcsCommand<IAwsEcsParams> {
  constructor() {
    super(DeployImageV17.name);
  }

  async main(
    _args: string[],
    { app, target, ecr, region, profile, appRoot, suffix }: IParams
  ): Promise<void> {
    const executionStart = new Date();
    try {
      await copyPackageJsonVersion(app, appRoot);
    } catch (error) {
      console.log('failed to upload package.json version', error);
    }
    buildApp(app, 'production');
    if (app.includes('api-')) {
      try {
        buildApp(app.replace('api-', 'ui-'), target as any);
      } catch (e) {
        console.log(e);
      }
    }
    const { repoColonTag } = genMetadata(app, ecr);
    const cluster = `${app}${suffix}-cluster`;
    const service = `${app}${suffix}-service`;
    buildImage(app, repoColonTag, appRoot);
    loginToEcr(profile, region, ecr);
    pushImageToEcr(repoColonTag);
    stopAllTasks(profile, cluster, service);
    logElapsedTime(executionStart, DeployImageV17.name);
  }
}
