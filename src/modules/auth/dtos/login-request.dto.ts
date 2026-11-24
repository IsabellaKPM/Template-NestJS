import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
} from "class-validator";

export class LoginRequestDto {
  @ApiProperty({
    required: false,
    example: "john@example.com",
    description: "Required when username is not provided",
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.trim().toLowerCase() : value,
  )
  @ValidateIf((dto: LoginRequestDto) => !dto.username)
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: false,
    example: "johndoe99",
    description: "Required when email is not provided",
  })
  @ValidateIf((dto: LoginRequestDto) => !dto.email)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username?: string;

  @ApiProperty({ required: true, example: "StrongP@ssw0rd!" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password!: string;
}
