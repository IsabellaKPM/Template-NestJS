import "reflect-metadata";
import cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { ConfigType } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "@modules/app.module";
import { setupSwagger } from "@infrastructure/config/swagger.setup";
import { appConfig } from "@infrastructure/config/configs/app.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const appConf = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  app.enableCors({
    origin: appConf.corsOrigins,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSwagger(app);

  await app.listen(appConf.port, appConf.host);
}

bootstrap().catch((err) => {
  console.error("Error starting the application:", err);
  process.exit(1);
});
