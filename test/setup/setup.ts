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

  dotenv.config({ path: path.resolve(__dirname, "../.env.test") });
  process.env.NODE_ENV = "test";
  process.env.JWT_ACCESS_SECRET = "test-access-secret";
  process.env.JWT_REFRESH_SECRET = "test-refresh-secret";

  const container = await startPostgresContainer();
  global.__POSTGRES_CONTAINER__ = container;
  mapContainerToEnv(container);
  await setupTestDatabase();
};
