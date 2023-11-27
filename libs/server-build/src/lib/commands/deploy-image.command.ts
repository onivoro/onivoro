import { Command } from 'nest-commander';
import { buildApp } from '../functions/build-app.function';
import { buildImage } from '../functions/build-image.function';
import { copyPackageJsonVersion } from '../functions/copy-package-json-version.function';
import { genMetadata } from '../functions/gen-metadata.function';
import { logElapsedTime } from '../functions/log-elapsed-time.function';
import { loginToEcr } from '../functions/login-to-ecr.function';
import { pushImageToEcr } from '../functions/push-image-to-ecr.function';
import { IAwsEcsParams } from '../types/aws-ecs-params.interface';
import { AbstractAwsEcsCommand } from './abstract-aws-ecs.command';

type IParams = IAwsEcsParams;

@Command({ name: DeployImage.name })
export class DeployImage extends AbstractAwsEcsCommand<IAwsEcsParams> {
  constructor() {
    super(DeployImage.name);
  }

  async main(
    _args: string[],
    { app, target, ecr, region, profile, appRoot }: IParams
  ): Promise<void> {
    const executionStart = new Date();
    try {

      await copyPackageJsonVersion(app, appRoot);
    } catch (error) {
      console.log('failed to upload package.json version', error);
    }
    buildApp(app, 'production');
    if (app.includes('api-')) {
      buildApp(app.replace('api-', 'ui-'), target);
    }
    const tag = ``;
    const { repoColonTag } = genMetadata(tag, ecr);
    buildImage(app, repoColonTag, appRoot);
    loginToEcr(profile, region, ecr);
    pushImageToEcr(repoColonTag);
    const suffix = target === 'production' ? '' : '-staging';
    logElapsedTime(executionStart, DeployImage.name);
  }
}
