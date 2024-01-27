import { Controller, Get, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { versionProviderToken } from '../constants/version-provider-token.constant';
import { HealthDto } from '../dtos/health.dto';
import { getMemoryStats } from '../functions/get-memory-stats.function';

@Controller('health')
export class HealthController {

  constructor(@Inject(versionProviderToken) private version: string) { }

  @Get()
  @ApiResponse({ type: HealthDto })
  get() {
    return { ...getMemoryStats(), version: this.version };
  }
}
