import { registerAs } from "@nestjs/config";

export const jwtConfig = registerAs("jwt", () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenMaxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE),
  refreshTokenMaxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE),
}));
