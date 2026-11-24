import type { DataSource } from "typeorm";
import { AdminUserSeed } from "../seeds/admin-user.seed";

export async function runSeeds(dataSource: DataSource): Promise<void> {
  const seeds = [new AdminUserSeed()];

  for (const seed of seeds) {
    await seed.run(dataSource);
    console.log(`------ ${seed.constructor.name} Seeded ------`);
  }
}
