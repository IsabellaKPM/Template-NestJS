import { ForbiddenException } from "@nestjs/common";

export class SelfModificationException extends ForbiddenException {
  constructor() {
    super("You cannot delete, deactivate or change the role of your own user.");
  }
}
