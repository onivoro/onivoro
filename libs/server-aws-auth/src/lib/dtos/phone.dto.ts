import { ApiProperty } from '@nestjs/swagger';

export class PhoneDto {
  @ApiProperty()
  phone: string;
}
