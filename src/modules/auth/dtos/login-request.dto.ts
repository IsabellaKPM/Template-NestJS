import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  username?: string;

  @ApiProperty({ required: true })
  password!: string;
}
