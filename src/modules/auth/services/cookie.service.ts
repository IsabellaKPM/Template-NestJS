import { Response } from "express";
import { type ConfigType } from "@nestjs/config";
import { Inject, Injectable } from "@nestjs/common";
import { jwtConfig } from "@infrastructure/config/configs/jwt.config";
import { appConfig } from "@infrastructure/config/configs/app.config";

@Injectable()
export class CookieService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwt: ConfigType<typeof jwtConfig>,
    @Inject(appConfig.KEY)
    private readonly app: ConfigType<typeof appConfig>,
  ) {}

  public setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): void {
    const cookieOptions = {
      httpOnly: true,
      secure: this.app.isProduction,
      sameSite: "strict" as const,
    };

    res.cookie("access_token", accessToken, {
      ...cookieOptions,
      maxAge: this.jwt.accessTokenMaxAge * 1000,
    });
    res.cookie("refresh_token", refreshToken, {
      ...cookieOptions,
      maxAge: this.jwt.refreshTokenMaxAge * 1000,
    });
  }

  public clearAuthCookies(res: Response): void {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
  }
}
