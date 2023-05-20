import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthMiddleware } from './middleware/auth.middleware';

import { AuthConfig } from './classes/auth-config.class';
import { AuthGuard } from './guards/auth.guard';
import { AuthController } from './controllers/auth.controller';
import { moduleFactory } from '@onivoro/server-common';

const providers = [AuthService, AuthMiddleware, AuthGuard];

@Module({})
export class AuthModule {
  static configure(config: AuthConfig): DynamicModule {
    return moduleFactory({
      providers: [
        ...providers,
        {
          provide: AuthConfig, useValue: config
        }
      ],
      controllers: [AuthController],
      module: AuthModule,
    });
  }
}
