import { DynamicModule, Module } from '@nestjs/common';
import { moduleFactory } from '@onivoro/server-common';
import { ServerAwsLambdaConfig } from './classes/server-aws-lambda-config.class';
import { Lambda } from 'aws-sdk';
import { LambdaService } from './services/lambda.service';

@Module({})
export class ServerAwsLambdaModule {
  static configure(config: ServerAwsLambdaConfig): DynamicModule {
    return moduleFactory({
      module: ServerAwsLambdaModule,
      providers: [
        {
          provide: ServerAwsLambdaConfig,
          useValue: config
        },
        {
          provide: LambdaService,
          useFactory: () => new LambdaService(new Lambda({ region: config.AWS_REGION }))
        }
      ]
    });
  }
}
