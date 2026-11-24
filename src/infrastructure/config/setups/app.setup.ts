import cookieParser from "cookie-parser";
import { ValidationPipe, type INestApplication } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import { appConfig } from "../configs/app.config";

export function configureApp(
  app: INestApplication,
): ConfigType<typeof appConfig> {
  const appConf = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  app.use(cookieParser());

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

  return appConf;
}
