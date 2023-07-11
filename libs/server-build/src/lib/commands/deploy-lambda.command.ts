import { Command } from 'nest-commander';
import { buildApp } from '../functions/build-app.function';
import { deployLambda } from '../functions/deploy-lambda.function';
import { AbstractAwsLambdaCommand } from './abstract-aws-lambda.command';
import { IAwsLambdaParams } from '../types/aws-lambda-params.interface';

@Command({ name: DeployLambda.name })
export class DeployLambda extends AbstractAwsLambdaCommand<IAwsLambdaParams> {
  constructor() {
    super(DeployLambda.name);
  }

  async main(
    _args: string[],
    params: IAwsLambdaParams
  ): Promise<void> {
    buildApp(params.app, 'production');
    deployLambda(
      params,
      false,
    );
  }
}
