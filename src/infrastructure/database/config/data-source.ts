import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";
import { ENTITIES } from "./entities";

const isProd = process.env.NODE_ENV === "production";

export const createDataSource = () => {
  const migrations = isProd
    ? join(__dirname, "../migrations/*.js")
    : join(__dirname, "../migrations/*.ts");

  const entities = isProd
    ? [join(__dirname, "../../../**/*.entity.js")]
    : ENTITIES;

  return new DataSource({
    type: "postgres",
    url: process.env.DB_URL,

    entities: entities,
    migrations: [migrations],

    synchronize: false,
    logging: false,
    migrationsRun: false,

    ssl: isProd ? { rejectUnauthorized: false } : false,
  });
};
