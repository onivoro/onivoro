import { ApiProperty } from "@nestjs/swagger";

export class AuthTokensDto {
    @ApiProperty() token: string;
    @ApiProperty() idToken: string;
}
