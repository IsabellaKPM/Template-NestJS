export const SWAGGER_CONFIG = {
  PATH: "docs",
  TITLE: "Mially API",
  DESCRIPTION: "Documentación de la API de Mially",
  VERSION: "0.0.0",

  BEARER_AUTH_NAME: "access-token",
  BEARER_AUTH: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    name: "JWT",
    description: "Ingresa tu token JWT",
    in: "header",
  },
} as const;

export const API_TAGS = {
  HEALTH: "Health",
};
