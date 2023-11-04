import { ApiProperty } from "@nestjs/swagger";

export class LoginWithEmailAndPasswordDto {
    @ApiProperty() email: string;
    @ApiProperty() password: string;
}