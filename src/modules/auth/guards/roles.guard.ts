import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { UserDto } from "../../users/dtos/user.dto";
import { AUTH_MODULE_CONSTANTS } from "../constants/auth.constants";
import { UserRoles } from "../../users/enums/user-roles.enum"; // <-- Ajusta esta ruta si es diferente
import { ForbiddenActionException } from "../exceptions/forbidden-action.exception";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
      UserRoles[] | undefined
    >(AUTH_MODULE_CONSTANTS.ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: UserDto }>();
    const user = request.user;
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenActionException();
    }

    return true;
  }
}
