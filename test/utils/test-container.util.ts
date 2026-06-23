import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

export async function startPostgresContainer(): Promise<StartedPostgreSqlContainer> {
  const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

  return new PostgreSqlContainer("postgres:15-alpine")
    .withDatabase(DB_NAME || "test_db")
    .withUsername(DB_USER || "test")
    .withPassword(DB_PASSWORD || "test")
    .start();
}

export function mapContainerToEnv(container: StartedPostgreSqlContainer) {
  const host = container.getHost();
  const port = container.getMappedPort(5432).toString();
  const user = container.getUsername();
  const pass = container.getPassword();
  const db = container.getDatabase();

  process.env.DB_HOST = host;
  process.env.DB_PORT = port;
  process.env.DB_USER = user;
  process.env.DB_PASSWORD = pass;
  process.env.DB_NAME = db;
  process.env.DB_URL = `postgresql://${user}:${pass}@${host}:${port}/${db}`;
}

export async function stopPostgresContainer() {
  const container = global.__POSTGRES_CONTAINER__;

  if (container) {
    console.log("--- Stopping Test Container ---");
    await container.stop();
    console.log("--- Test Container Stopped Successfully ---");
  } else {
    console.warn("--- No Test Container found to stop ---");
  }
}
