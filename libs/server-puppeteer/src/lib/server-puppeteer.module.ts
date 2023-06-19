import { Module } from '@nestjs/common';
import { moduleFactory } from '@onivoro/server-common';
import puppeteer, { Browser } from 'puppeteer-core';
import { ServerPuppeteerConfig } from './classes/server-puppeteer-config.class';

let browser: Browser | null = null;

@Module(moduleFactory({
  providers: [
    {
      provide: Browser,
      useFactory: async (options: ServerPuppeteerConfig) => browser || (browser = await puppeteer.launch(options)),
      inject: [ServerPuppeteerConfig]
    }
  ]
}))
export class ServerPuppeteerModule {
  static configure(serverPuppeteerConfig: ServerPuppeteerConfig) {
    return moduleFactory({
      module: ServerPuppeteerModule,
      providers: [
        {
          provide: ServerPuppeteerConfig,
          useValue: serverPuppeteerConfig
        }
      ]
    });
  }
}
