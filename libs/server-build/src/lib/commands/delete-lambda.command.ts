import { Command } from 'nest-commander';
import { IAwsAppParams } from '../types/aws-app-params.interface';
import { shell } from '../functions/shell.function';
import { AbstractAwsAppCommand } from './abstract-aws-app.command';
import { getLambdaNameByBranch } from '../functions/get-lambda-name-by-branch.function';

@Command({ name: DeleteLambda.name })
export class DeleteLambda extends AbstractAwsAppCommand<IAwsAppParams> {
  constructor() {
    super(DeleteLambda.name);
  }

  async run(
    _args: string[],
    params: IAwsAppParams
  ): Promise<void> {
    return this.main([], params);
  }

  async main(
    _args: string[],
    { app, region, profile, branch }: IAwsAppParams
  ): Promise<void> {
    shell(
      `aws lambda delete-function --function-name "${getLambdaNameByBranch(app, branch)}" --region ${region} --profile ${profile}`
    );
  }
}
