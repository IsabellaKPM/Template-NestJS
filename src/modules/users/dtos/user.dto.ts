import { ApiProperty } from "@nestjs/swagger";
import { UserRoles } from "../enums/user-roles.enum";
import { UserStatus } from "../enums/user-status.enum";

export class UserDto {
  @ApiProperty({
    required: true,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id!: string;

  @ApiProperty({ required: true, example: "John Doe" })
  name!: string;

  @ApiProperty({ required: true, example: "johndoe99" })
  username!: string;

  @ApiProperty({ required: true, example: "john@example.com" })
  email!: string;

  @ApiProperty({ required: true, enum: UserRoles })
  role!: UserRoles;

  @ApiProperty({ required: true, enum: UserStatus })
  status!: UserStatus;
}
