import { ApiProperty } from '@nestjs/swagger';

export class SuccessDto {
  @ApiProperty({ type: 'string' })
  success: boolean;
}
