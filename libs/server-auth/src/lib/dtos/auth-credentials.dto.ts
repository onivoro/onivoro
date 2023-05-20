import { ApiProperty } from "@nestjs/swagger";
import { IAuthCredentialsDto } from "../interfaces/auth.interface";

export class AuthCredentialsDto implements IAuthCredentialsDto {
    @ApiProperty() password: string;
    @ApiProperty() name: string;
}