import { ApiProperty } from "@nestjs/swagger";

export class LoginWithApiCredentialsDto {
    @ApiProperty() apiId: string;
    @ApiProperty() apiKey: string;
}