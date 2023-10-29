import { Module } from '@nestjs/common';
import { DeployLambda } from './commands/deploy-lambda.command';
import { DeployImage } from './commands/deploy-image.command';
import { RedeployLambda } from './commands/reddeploy-lambda.command';
import { DeleteLambda } from './commands/delete-lambda.command';
import { OpenapiGen } from './commands/openapi-gen.command';
import { OpenapiGenV2 } from './commands/openapi-gen-v2.command';

export const providers = [
  DeployLambda,
  RedeployLambda,
  DeployImage,
  DeleteLambda,
  OpenapiGen,
  OpenapiGenV2,
];

@Module({
   providers
})
export class ServerBuildModule {}
