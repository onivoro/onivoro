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

type IParams = IAwsEcsParams & { branch: string };

@Command({ name: DeployImage.name })
export class DeployImage extends AbstractAwsEcsCommand<IAwsEcsParams> {
  constructor() {
    super(DeployImage.name);
  }

  async main(
    _args: string[],
    { app, branch, ecr, region, profile }: IParams
  ): Promise<void> {
    const executionStart = new Date();
    const isProduction = branch === 'main';
    const target = isProduction ? 'production' : 'staging';
    await copyPackageJsonVersion(app);
    buildApp(app, 'production');
    if (app.includes('api-')) {
      buildApp(app.replace('api-', 'ui-'), target);
    }
    const { repoColonTag } = genMetadata(app, ecr, isProduction);
    buildImage(app, repoColonTag);
    loginToEcr(profile, region, ecr);
    pushImageToEcr(repoColonTag);
    stopAllTasks(app, target);
    logElapsedTime(executionStart, DeployImage.name);
  }

  @Option({
    flags: '-b, --branch [branch]',
    description:
      'git branch name',
    required: true
  })
  parseBranch(val?: string) {
    return val;
  }
}
