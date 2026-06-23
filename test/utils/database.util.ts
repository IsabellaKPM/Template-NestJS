import { createDataSource } from "../../src/infrastructure/database/config/data-source";

export async function setupTestDatabase() {
  console.log("--- Running Database Migrations & Seeds ---");
  const dataSource = createDataSource();

  try {
    await dataSource.initialize();
    await dataSource.runMigrations();
    await dataSource.destroy();
    console.log("--- Database Ready ---");
  } catch (error: unknown) {
    console.error("--- Database Setup Failed ---");
    console.error(error);
    throw error;
  }
}
