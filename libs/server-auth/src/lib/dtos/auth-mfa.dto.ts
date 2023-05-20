import { ApiProperty } from "@nestjs/swagger";
import { IAuthMfaDto } from "../interfaces/auth.interface";

export class AuthMfaDto implements IAuthMfaDto {
    @ApiProperty() mfa: string;
    @ApiProperty() username: string;
}