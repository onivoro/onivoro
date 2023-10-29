import { Module } from '@nestjs/common';
import { BuildEmbedded } from './commands/build-embedded.command';
import { ServerAwsS3Config, ServerAwsS3Module } from '@onivoro/server-aws-s3';
import { moduleFactory } from '@onivoro/server-common';
import { providers } from './server-build.module';
import { BuildEmbeddedService } from './services/build-embedded.service';

@Module({})
export class ServerBuildWithS3Module {
  static configure(config: ServerAwsS3Config) {
    return moduleFactory({
      providers: [
        ...providers,
        BuildEmbedded,
        BuildEmbeddedService,
      ],
      imports: [
        ServerAwsS3Module.configure(config)
      ]
    });
  };
}
