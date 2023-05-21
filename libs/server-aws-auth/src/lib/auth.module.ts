import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthMiddleware } from './middleware/auth.middleware';

import { AuthConfig } from './classes/auth-config.class';
import { AuthGuard } from './guards/auth.guard';
import { AuthController } from './controllers/auth.controller';
import { moduleFactory } from '@onivoro/server-common';
import { AdminCognitoService } from './services/admin-cognito.service';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

const providers = [AuthService, AuthMiddleware, AuthGuard];

@Module({})
export class AuthModule {
  static configure(config: AuthConfig, apiVersion?: string): DynamicModule {
    return moduleFactory({
      module: AuthModule,
      providers: [
        ...providers,
        {
          provide: AuthConfig, useValue: config
        },
        {
          provide: AdminCognitoService, useFactory: new AdminCognitoService(
            config,
            new CognitoIdentityServiceProvider({
              apiVersion: apiVersion || '2016-04-18',
              region: config.AWS_REGION,
            })
          )
        }
      ],
      controllers: [AuthController],
      // imports: [ServerAwsCognitoModule.configure(config, apiVersion)]
    });
  }
}
