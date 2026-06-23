import { INestApplication } from "@nestjs/common";

export async function closeApp(app: INestApplication) {
  if (app) {
    await app.close();
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
