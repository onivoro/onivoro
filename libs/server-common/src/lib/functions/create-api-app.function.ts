import { initOpenapi } from './init-openapi.function';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export async function createApiApp(
  module: { name: string },
  port: number,
  project: string,
  corsOptions?: CorsOptions,
) {

  const app = await NestFactory.create(module, { logger: console });
  const globalPrefix: string = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors(corsOptions);
  app.enableShutdownHooks();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await initOpenapi(app, module.name, project);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  return app;
}
