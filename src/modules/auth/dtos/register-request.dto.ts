import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "@modules/users/dtos/create-user.dto";

export class RegisterRequestDto extends PickType(CreateUserDto, [
  "name",
  "username",
  "email",
  "password",
] as const) {}
