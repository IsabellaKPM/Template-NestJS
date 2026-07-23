import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";

declare global {
  var __POSTGRES_CONTAINER__: StartedPostgreSqlContainer | undefined;
}
