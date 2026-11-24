import { ConflictException } from "@nestjs/common";

export class UserAlreadyExistsException extends ConflictException {
  constructor(field: "email" | "username") {
    super(`A user with this ${field} already exists`);
  }
}
