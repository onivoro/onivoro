import { Module } from '@nestjs/common';
import { moduleFactory } from '@onivoro/server-common';
import { DownloadService } from './services/download.service';

@Module(moduleFactory({
  providers: [DownloadService],
}))
export class ServerYtDlModule { }
