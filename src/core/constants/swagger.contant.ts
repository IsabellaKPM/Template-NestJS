import * as packageInfo from "../../../package.json";

export const SWAGGER_CONFIG = {
  PATH: "docs",
  TITLE: "API",
  DESCRIPTION: "Documentación de la API de NestJS",
  VERSION: packageInfo.version,

  BEARER_AUTH_NAME: "access-token",
  BEARER_AUTH: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    name: "JWT",
    description: "Insert the JWT token in the following format: Bearer <token>",
    in: "header",
  },
} as const;

export const API_TAGS = {
  HEALTH: "Health",
};
