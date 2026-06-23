import request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";
import { resetDatabase } from "../utils/db-reset.util";
import { closeApp } from "../utils/close-app.util";
import type { Server } from "http";
import { ApiModule } from "@modules/api/api.module";

export interface TestAppContext {
  app: INestApplication;
  dataSource: DataSource;
  request: ReturnType<typeof request>;
  cleanup: () => Promise<void>;
}

export async function createTestApp(): Promise<TestAppContext> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [ApiModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const dataSource = app.get(DataSource);

  let cleaned = false;
  const cleanup = async () => {
    if (cleaned) return;
    cleaned = true;

    if (dataSource?.isInitialized) {
      await resetDatabase(dataSource);
    }

    await closeApp(app);

    if (dataSource?.isInitialized) {
      await dataSource.destroy();
    }
  };

  return {
    app,
    dataSource,
    request: request(app.getHttpServer() as Server),
    cleanup,
  };
}
