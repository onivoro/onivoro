import { ApiProperty } from '@nestjs/swagger';

export class RegistrationSignupDto {
  @ApiProperty() email: string;
  @ApiProperty({ type: 'boolean' }) isAdmin: boolean;
  @ApiProperty() orgId: string;
}
