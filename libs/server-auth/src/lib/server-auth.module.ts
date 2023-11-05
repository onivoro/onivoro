import { Module } from '@nestjs/common';

import { moduleFactory, ServerCommonModule } from '@onivoro/server-common';

import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { TokenValidationService } from './services/token-validation.service';
import { ServerAuthConfig } from './classes/server-auth-config.class';
import { TokenBuilder } from './classes/token-builder.class';

const controllers = [
  LoginController,
];

const imports = [
  ServerCommonModule,
];

const providers = [
  LoginService,
  TokenValidationService,
  TokenBuilder,
];

@Module({
  providers,
  controllers,
  imports
})
export class ServerAuthModule {
  static configure<TAccessToken>(
    config: ServerAuthConfig,
  ) {
    return moduleFactory({
      module: ServerAuthModule,
      controllers,
      imports,
      providers: [
        ...providers,
        {
          provide: ServerAuthConfig,
          useValue: config
        },
      ],
    })
  }
}
