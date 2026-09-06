import "reflect-metadata";
import { DataSource } from "typeorm";
import { databaseConfig } from "@infrastructure/config/configs/database.config";

export const createDataSource = (): DataSource => {
  return new DataSource(databaseConfig());
};
