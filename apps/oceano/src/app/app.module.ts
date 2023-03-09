import { Module } from '@nestjs/common';
import { ServerFileModule } from '@onivoro/server-file';

@Module({
  imports: [ServerFileModule],
})
export class AppModule { }
