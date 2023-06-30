import { Module } from '@nestjs/common';
import { moduleFactory } from '@onivoro/server-common';
import puppeteer, { Browser } from 'puppeteer';
import { ServerPuppeteerConfig } from './classes/server-puppeteer-config.class';
import { PuppeteerService } from './services/puppeteer.service';

let browser: Browser | null = null;

@Module({})
export class ServerPuppeteerModule {
  static configure(serverPuppeteerConfig: ServerPuppeteerConfig) {
    return moduleFactory({
      module: ServerPuppeteerModule,
      providers: [
        {
          provide: ServerPuppeteerConfig,
          useValue: serverPuppeteerConfig
        },
        {
          provide: Browser,
          useFactory: async (options: ServerPuppeteerConfig) => browser || (browser = await puppeteer.launch(options)),
          inject: [ServerPuppeteerConfig]
        },
        PuppeteerService
      ]
    });
  }
}
