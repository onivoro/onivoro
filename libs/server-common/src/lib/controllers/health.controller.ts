import { Controller, Get, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { totalmem, freemem } from 'os';
import { versionProviderToken } from '../constants/version-provider-token.constant';
import { HealthDto } from '../dtos/health.dto';

@Controller('health')
export class HealthController {

  constructor(@Inject(versionProviderToken) private version: string) { }

  @Get()
  @ApiResponse({ type: HealthDto })
  get() {
    const total = totalmem();
    const free = freemem();
    return { free, total, percentUtilization: (free / total) * 100, version: this.version };
  }
}
