import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserModule } from "../users/user.module";
import { AuthService } from "./services/auth.service";
import { CookieService } from "./services/cookie.service";
import { PasswordService } from "./services/password.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow("JWT_ACCESS_SECRET"),
        signOptions: {
          expiresIn: "15m",
        },
      }),
    }),
  ],
  providers: [AuthService, CookieService, PasswordService, JwtStrategy],
  exports: [AuthService, CookieService, PasswordService],
})
export class AuthModule {}
