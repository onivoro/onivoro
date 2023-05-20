import { Module } from '@nestjs/common';
import { HealthController } from './controllers/health.controller';
import { versionProviderToken } from './constants/version-provider-token.constant';
import { parsePackageJson } from './functions/parse-package-json.function';
import { moduleFactory } from './functions/module-factory.function';

@Module(
  moduleFactory({
    controllers: [HealthController],
    providers: [
      {
        provide: versionProviderToken,
        useFactory: async () => {
          try {
            return (await parsePackageJson()).version;
          } catch (error: any) {
            console.error(error);
            return '0.0.0';
          }
        },
      },
    ],
  })
)
export class ServerCommonModule {}
