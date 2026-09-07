import { SetMetadata } from "@nestjs/common";
import { UserRoles } from "../../users/enums/user-roles.enum";
import { ROLES_KEY } from "../constants/auth.constants";

export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
