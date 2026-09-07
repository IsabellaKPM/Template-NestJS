import Joi from "joi";

const ONE_HOUR_IN_SECONDS = 3600;
const SEVEN_DAYS_IN_SECONDS = 604800;

const requiredUnlessProd = Joi.string().when("NODE_ENV", {
  is: "production",
  then: Joi.optional(),
  otherwise: Joi.required(),
});

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  PORT: Joi.number().default(3000),
  HOST: Joi.string().default("0.0.0.0"),
  CORS_ORIGINS: Joi.string().optional(),

  DB_URL: Joi.string().when("NODE_ENV", {
    is: "production",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),

  DB_HOST: requiredUnlessProd,
  DB_PORT: Joi.number().default(5432),
  DB_USER: requiredUnlessProd,
  DB_PASSWORD: requiredUnlessProd,
  DB_NAME: requiredUnlessProd,

  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  ACCESS_TOKEN_MAX_AGE: Joi.number().default(ONE_HOUR_IN_SECONDS),
  REFRESH_TOKEN_MAX_AGE: Joi.number().default(SEVEN_DAYS_IN_SECONDS),
});
