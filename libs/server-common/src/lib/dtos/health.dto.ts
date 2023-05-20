import { ApiProperty } from "@nestjs/swagger";

export class HealthDto {
    @ApiProperty({ type: 'number' }) free: number;
    @ApiProperty({ type: 'number' }) total: number;
    @ApiProperty({ type: 'number' }) percentUtilization: number;
    @ApiProperty({ type: 'string' }) version: string;
}