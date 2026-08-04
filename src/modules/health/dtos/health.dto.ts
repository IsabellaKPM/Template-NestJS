import { ApiProperty } from "@nestjs/swagger";

export class HealthDto {
  @ApiProperty({
    description: "The current status of the API",
    example: "ok",
  })
  status!: string;

  @ApiProperty({
    description: "The timestamp when the health check was performed",
    example: "2026-04-20T10:00:00Z",
  })
  timestamp!: string;
}
