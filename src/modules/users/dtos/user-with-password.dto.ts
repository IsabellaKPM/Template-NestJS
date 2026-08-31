import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class UserWithPasswordDto extends UserDto {
  @ApiProperty({
    required: true,
    description:
      "The hashed password of the user (used internally for authentication)",
    example: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjIQG8.hqS",
  })
  encryptedPassword!: string;
}
