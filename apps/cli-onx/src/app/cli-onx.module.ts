import { Module } from '@nestjs/common';
import { Test } from './commands/test.command';
@Module({
  providers: [Test],
  imports: [],
})
export class CliOnxModule {}
