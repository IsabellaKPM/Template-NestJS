import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@modules/app.module";
import { setupSwagger } from "@infrastructure/config/setups/swagger.setup";
import { configureApp } from "@infrastructure/config/setups/app.setup";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConf = configureApp(app);
  setupSwagger(app);

  await app.listen(appConf.port, appConf.host);
}

bootstrap().catch((err) => {
  console.error("Error starting the application:", err);
  process.exit(1);
});
