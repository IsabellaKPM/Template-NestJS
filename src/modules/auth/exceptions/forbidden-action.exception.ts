import { ForbiddenException } from "@nestjs/common";

export class ForbiddenActionException extends ForbiddenException {
  constructor() {
    super("User doesn't have sufficient permissions to perform this action.");
  }
}
