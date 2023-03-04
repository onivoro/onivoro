import { Command } from 'nest-commander';
import { buildApp } from '../functions/build-app.function';
import { deployLambda } from '../functions/deploy-lambda.function';
import { IAwsLambdaParams } from '../types/aws-lambda-params.interface';
import { AbstractAwsLambdaCommand } from './abstract-aws-lambda.command';

@Command({ name: RedeployLambda.name })
export class RedeployLambda extends AbstractAwsLambdaCommand<IAwsLambdaParams> {
  constructor() {
    super(RedeployLambda.name);
  }

  async main(
    _args: string[],
    params: IAwsLambdaParams
  ): Promise<void> {
    buildApp(params.app, 'production');
    deployLambda(
      params,
      true,
    );
  }
}
