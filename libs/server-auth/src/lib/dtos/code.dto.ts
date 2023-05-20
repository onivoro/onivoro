import { ApiProperty } from '@nestjs/swagger';

export class CodeDto {
  @ApiProperty()
  code: string;
}
