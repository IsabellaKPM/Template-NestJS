import { registerAs } from "@nestjs/config";
import { join } from "path";
import { ENTITIES } from "@infrastructure/database/data-source/entities";

export const databaseConfig = registerAs("database", () => {
  const isProd = process.env.NODE_ENV === "production";

  return {
    type: "postgres" as const,
    url: process.env.DB_URL,

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
