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
  Object.assign(process.env, {
    DB_HOST: container.getHost(),
    DB_PORT: container.getMappedPort(5432).toString(),
    DB_USER: container.getUsername(),
    DB_PASSWORD: container.getPassword(),
    DB_NAME: container.getDatabase(),
  });
}

export async function stopPostgresContainer(): Promise<void> {
  const container = global.__POSTGRES_CONTAINER__;

  if (container) {
    console.log("--- Stopping Test Container ---");
    await container.stop();
    console.log("--- Test Container Stopped Successfully ---");
  } else {
    console.warn("--- No Test Container found to stop ---");
  }
}
