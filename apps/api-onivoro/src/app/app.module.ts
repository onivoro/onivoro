import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@onivoro/server-aws-auth';
import { ServerCommonModule } from '@onivoro/server-common';

@Module({
  imports: [
    AuthModule.configure({
      mfaEnabled: false, AWS_REGION: 'us-east-2',
      AWS_COGNITO_CLIENT_ID: '77uh36bongfir4hb73p42uk9ha',
      AWS_COGNITO_USER_POOL_ID: 'us-east-2_HIPZ2DD26'
    }),
    ServerCommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
