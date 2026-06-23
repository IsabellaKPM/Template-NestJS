import dataSource from "../../config/data-source.cli";

async function bootstrap(): Promise<void> {
  await dataSource.initialize();
  // await runSeeds(dataSource);
  await dataSource.destroy();
}

void bootstrap();
