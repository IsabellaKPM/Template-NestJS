import { ApiProperty } from "@nestjs/swagger";

export class MessageResponseDto {
  @ApiProperty({ required: true, example: "Operation successful" })
  message!: string;
}
