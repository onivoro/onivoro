import { AppModule } from './app/app.module';
import { createApiApp } from '@onivoro/server-common';

async function bootstrap() {
  await createApiApp(AppModule, 3333, 'api-onivoro')  ;
}

bootstrap();
