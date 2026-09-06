import * as packageInfo from "../../../package.json";

export const SWAGGER_CONFIG = {
  PATH: "docs",
  TITLE: "API",
  DESCRIPTION: "NestJS Template API Documentation",
  VERSION: packageInfo.version,

  BEARER_AUTH_NAME: "bearer-token",
  BEARER_AUTH: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    name: "JWT",
    description:
      "JWT Authorization header using the Bearer scheme. Example: 'Authorization: Bearer {token}'",
    in: "header",
  },

  COOKIE_ACCESS_NAME: "access_token",
  COOKIE_ACCESS_AUTH: {
    type: "apiKey",
    in: "cookie",
    name: "access_token",
    description:
      "HttpOnly Cookie for user authentication. Example: 'access_token={token}'",
  },

  COOKIE_REFRESH_NAME: "refresh_token",
  COOKIE_REFRESH_AUTH: {
    type: "apiKey",
    in: "cookie",
    name: "refresh_token",
    description:
      "HttpOnly Cookie for token refresh. Example: 'refresh_token={token}'",
  },
} as const;

export const API_TAGS = {
  HEALTH: "Health",
  AUTH: "Authentication",
  USERS: "Users",
};
