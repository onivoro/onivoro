import { ApiProperty } from '@nestjs/swagger';

export class PasswordDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  confirm: string;
}
