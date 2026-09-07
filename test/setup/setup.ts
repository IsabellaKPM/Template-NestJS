import "tsconfig-paths/register";
import * as dotenv from "dotenv";
import * as path from "path";
import {
  startPostgresContainer,
  mapContainerToEnv,
} from "../utils/test-container.util";
import { setupTestDatabase } from "../utils/database.util";

export default async () => {
  console.log("\n--- Global Test Environment Setup ---");

  const result = dotenv.config({
    path: path.resolve(__dirname, "../../.env.test"),
  });

  if (
    result.error &&
    (result.error as NodeJS.ErrnoException).code !== "ENOENT"
  ) {
    console.error(
      "--- Error inesperado cargando .env.test:",
      result.error.message,
    );
  }

  const container = await startPostgresContainer();
  global.__POSTGRES_CONTAINER__ = container;
  mapContainerToEnv(container);

  await setupTestDatabase();
};
