import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UserService } from "@modules/users/services/user.service";
import { UnauthorizedUserException } from "../exceptions/unauthorized-user.exception";
import { UserStatus } from "@modules/users/enums/user-status.enum";
import { UserDto } from "@modules/users/dtos/user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookies = request.cookies as Record<string, string> | undefined;
          return cookies?.access_token ?? null;
        },
      ]),
      secretOrKey: configService.getOrThrow("JWT_ACCESS_SECRET"),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedUserException();
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedUserException();
    }

    return user;
  }
}
