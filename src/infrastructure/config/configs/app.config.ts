import { registerAs } from "@nestjs/config";
import { isProduction } from "../helpers/env.helpers";

export const appConfig = registerAs("app", () => ({
  port: Number(process.env.PORT),
  host: process.env.HOST as string,
  corsOrigins: process.env.CORS_ORIGINS?.split(",") ?? [],
  nodeEnv: process.env.NODE_ENV,
  isProduction: isProduction(),
}));
