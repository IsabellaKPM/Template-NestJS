import { Controller, Post, Get, Body, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { API_TAGS } from "@core/constants";
import { AuthService } from "../services/auth.service";
import { CookieService } from "../services/cookie.service";
import { LoginRequestDto } from "../dtos/login-request.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CurrentUser } from "../decorators/current-user.decorator";
import { Cookies } from "../decorators/cookies.decorator";
import { UserDto } from "../../users/dtos/user.dto";
import { UnauthorizedUserException } from "../exceptions/unauthorized-user.exception";
import {
  PostLoginDocs,
  PostRefreshDocs,
  PostLogoutDocs,
  GetMeDocs,
} from "../decorators/auth.client.docs";
import { MessageResponseDto } from "@core/dtos/message-response.dto";

@ApiTags(API_TAGS.AUTH)
@Controller("auth")
export class AuthClientController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post("login")
  @PostLoginDocs()
  public async login(
    @Body() dto: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserDto> {
    const { accessToken, refreshToken, user } =
      await this.authService.login(dto);
    this.cookieService.setAuthCookies(res, accessToken, refreshToken);

    return user;
  }

  @Post("refresh")
  @PostRefreshDocs()
  public async refresh(
    @Cookies("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<MessageResponseDto> {
    if (!refreshToken) throw new UnauthorizedUserException();

    const tokens = await this.authService.refreshTokens(refreshToken);
    this.cookieService.setAuthCookies(
      res,
      tokens.accessToken,
      tokens.refreshToken,
    );

    return { message: "Tokens refreshed successfully" };
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @PostLogoutDocs()
  public logout(@Res({ passthrough: true }) res: Response): MessageResponseDto {
    this.cookieService.clearAuthCookies(res);
    return { message: "Logout successful" };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @GetMeDocs()
  public getMe(@CurrentUser() user: UserDto): UserDto {
    return user;
  }
}
