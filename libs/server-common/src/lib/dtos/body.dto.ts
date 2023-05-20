import { ApiProperty } from "@nestjs/swagger";

export class BodyDto {
    @ApiProperty()
    body: string;
}
