import dataSource from "../../data-source/data-source.cli";
import { runSeeds } from "./run-seeds";

async function bootstrap(): Promise<void> {
  await dataSource.initialize();
  await runSeeds(dataSource);
  await dataSource.destroy();
}

bootstrap().catch((error) => {
  console.error("Error running seeds:", error);
  process.exit(1);
});
