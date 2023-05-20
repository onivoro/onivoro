import { ApiProperty } from '@nestjs/swagger';

export class ValueDto {
  @ApiProperty()
  value: string;
}
