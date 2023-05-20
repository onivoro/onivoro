import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  isAnon: boolean;
}
