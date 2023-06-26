#! /usr/bin/env node

import { CommandFactory } from 'nest-commander';

import { CliOnxModule } from './app/cli-onx.module';

async function bootstrap() {
  await CommandFactory.run(CliOnxModule, ['warn', 'error']);
}

void bootstrap();
