import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerCommonModule } from '@onivoro/server-common';
import { HtmlController } from './html.controller';

@Module({
  imports: [
    ServerCommonModule,
  ],
  controllers: [AppController, HtmlController],
  providers: [AppService],
})
export class AppModule { }
