import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { UserDto } from "@modules/users/dtos/user.dto";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserDto => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user as UserDto;
  },
);
