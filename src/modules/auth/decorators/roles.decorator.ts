import { SetMetadata } from "@nestjs/common";
import { UserRoles } from "../../users/enums/user-roles.enum";
import { AUTH_MODULE_CONSTANTS } from "../constants/auth.constants";

export const Roles = (...roles: UserRoles[]) =>
  SetMetadata(AUTH_MODULE_CONSTANTS.ROLES_KEY, roles);
