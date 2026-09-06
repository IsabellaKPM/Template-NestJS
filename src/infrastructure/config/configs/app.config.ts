import { registerAs } from "@nestjs/config";

export const appConfig = registerAs("app", () => ({
  host: process.env.HOST || "0.0.0.0",
  port: Number(process.env.PORT) || 3000,
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : [],
}));
