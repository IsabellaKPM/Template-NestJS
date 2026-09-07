import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { type ConfigType } from "@nestjs/config";
import { jwtConfig } from "@infrastructure/config/configs/jwt.config";
import { UserDto } from "@modules/users/dtos/user.dto";
import { UserService } from "../../users/services/user.service";
import { PasswordService } from "./password.service";
import { LoginRequestDto } from "../dtos/login-request.dto";
import { UnauthorizedUserException } from "../exceptions/unauthorized-user.exception";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UserStatus } from "../../users/enums/user-status.enum";
import { JwtRefreshPayload } from "../interfaces/jwt-refresh-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwt: ConfigType<typeof jwtConfig>,
  ) {}

  public async login(dto: LoginRequestDto) {
    if (!dto.email && !dto.username) {
      throw new UnauthorizedUserException();
    }

    const user = dto.email
      ? await this.userService.findByEmailWithPassword(dto.email)
      : dto.username
        ? await this.userService.findByUsernameWithPassword(dto.username)
        : null;

    if (!user || user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedUserException();
    }

    const isPasswordValid = await this.passwordService.compare(
      dto.password,
      user.encryptedPassword,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedUserException();
    }

    return this.generateTokens(user);
  }

  public async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<JwtRefreshPayload>(refreshToken, {
        secret: this.jwt.refreshSecret,
      });

      const user = await this.userService.findById(payload.sub);

      if (!user || user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedUserException();
      }

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedUserException();
    }
  }

  private generateTokens(user: UserDto) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.jwt.accessTokenMaxAge,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.jwt.refreshSecret,
      expiresIn: this.jwt.refreshTokenMaxAge,
    });

    return { accessToken, refreshToken, user };
  }
}
