import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  IsEnum,
  IsOptional,
  MinLength,
} from "class-validator";
import { UserRoles } from "../enums/user-roles.enum";
import { UserStatus } from "../enums/user-status.enum";

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: "John Doe",
    description: "Full name of the user",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiProperty({
    required: true,
    example: "johndoe99",
    description: "Unique username",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username!: string;

  @ApiProperty({
    required: true,
    example: "john@example.com",
    description: "Unique email address",
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email!: string;

  @ApiProperty({
    required: true,
    example: "StrongP@ssw0rd!",
    description: "Raw password to be hashed",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  password!: string;

  @ApiProperty({
    required: false,
    enum: UserRoles,
    example: UserRoles.USER,
    default: UserRoles.USER,
  })
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;

  @ApiProperty({
    required: false,
    enum: UserStatus,
    example: UserStatus.ACTIVE,
    default: UserStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
