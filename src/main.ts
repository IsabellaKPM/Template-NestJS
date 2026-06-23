import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { API_CONFIG, SWAGGER_CONFIG } from "@core/constants";
import { ApiModule } from "@modules/api/api.module";

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  app.enableCors({
    origin: API_CONFIG.CORS_ORIGINS,
  });

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.TITLE)
    .setDescription(SWAGGER_CONFIG.DESCRIPTION)
    .setVersion(SWAGGER_CONFIG.VERSION)
    .addBearerAuth(SWAGGER_CONFIG.BEARER_AUTH, SWAGGER_CONFIG.BEARER_AUTH_NAME)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_CONFIG.PATH, app, document);

  await app.listen(API_CONFIG.PORT, API_CONFIG.HOST);
}

bootstrap().catch((err) => {
  console.error("Error starting the application:", err);
  process.exit(1);
});
