import { registerAs } from "@nestjs/config";
import { join } from "path";
import { ENTITIES } from "@infrastructure/database/data-source/entities";
import { isProduction } from "../helpers/env.helpers";

function resolveDatabaseUrl(): string {
  if (process.env.DB_URL) {
    return process.env.DB_URL;
  }

  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
  return `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

export const databaseConfig = registerAs("database", () => {
  const isProd = isProduction();

  return {
    type: "postgres" as const,
    url: resolveDatabaseUrl(),

    autoLoadEntities: false,
    entities: isProd ? ["dist/**/*.entity.js"] : ENTITIES,
    migrations: isProd
      ? [join(__dirname, "../../database/migrations/*.js")]
      : [join(__dirname, "../../database/migrations/*.ts")],

    synchronize: false,
    logging: false,
    migrationsRun: false,

    ssl: isProd ? { rejectUnauthorized: false } : false,
  };
});
