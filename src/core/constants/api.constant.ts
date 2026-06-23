export const API_CONFIG = {
  PREFIX: "api",
  HOST: process.env.HOST || "0.0.0.0",
  PORT: Number(process.env.PORT) || 3001,
  CORS_ORIGINS: process.env.CORS_ORIGINS?.split(",") || [
    "http://localhost:3001",
  ],
} as const;
