import { UnauthorizedException } from "@nestjs/common";

export class UnauthorizedUserException extends UnauthorizedException {
  constructor() {
    super("User is not authorized to access this resource.");
  }
}
