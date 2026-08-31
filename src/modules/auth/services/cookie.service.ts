import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { AUTH_MODULE_CONSTANTS } from "../constants/auth.constants";

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  public setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): void {
    const isProduction = this.configService.get("NODE_ENV") === "production";

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict" as const,
    };

    res.cookie("access_token", accessToken, {
      ...cookieOptions,
      maxAge: AUTH_MODULE_CONSTANTS.ACCESS_TOKEN_MAX_AGE,
    });

    res.cookie("refresh_token", refreshToken, {
      ...cookieOptions,
      maxAge: AUTH_MODULE_CONSTANTS.REFRESH_TOKEN_MAX_AGE,
    });
  }

  public clearAuthCookies(res: Response): void {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
  }
}
