import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

export async function startPostgresContainer(): Promise<StartedPostgreSqlContainer> {
  return new PostgreSqlContainer("postgres:15-alpine")
    .withDatabase(process.env.DB_NAME || "test_db")
    .withUsername(process.env.DB_USER || "test")
    .withPassword(process.env.DB_PASSWORD || "test")
    .start();
}

export function mapContainerToEnv(container: StartedPostgreSqlContainer): void {
  const host = container.getHost();
  const port = container.getMappedPort(5432).toString();
  const user = container.getUsername();
  const pass = container.getPassword();
  const db = container.getDatabase();

  Object.assign(process.env, {
    DB_HOST: host,
    DB_PORT: port,
    DB_USER: user,
    DB_PASSWORD: pass,
    DB_NAME: db,
    DB_URL: `postgresql://${user}:${pass}@${host}:${port}/${db}`,
  });
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
