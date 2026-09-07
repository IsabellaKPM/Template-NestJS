import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SWAGGER_CONFIG } from "@core/constants/swagger.constant";
import { HealthModule } from "@modules/health/health.module";
import { ApiModule } from "@modules/api/api.module";
import { AdminModule } from "@modules/admin/admin.module";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.TITLE)
    .setDescription(SWAGGER_CONFIG.DESCRIPTION)
    .setVersion(SWAGGER_CONFIG.VERSION)
    .addBearerAuth(SWAGGER_CONFIG.BEARER_AUTH, SWAGGER_CONFIG.BEARER_AUTH_NAME)
    .addCookieAuth(
      SWAGGER_CONFIG.COOKIE_ACCESS_NAME,
      SWAGGER_CONFIG.COOKIE_ACCESS_AUTH,
    )
    .addCookieAuth(
      SWAGGER_CONFIG.COOKIE_REFRESH_NAME,
      SWAGGER_CONFIG.COOKIE_REFRESH_AUTH,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [HealthModule, ApiModule, AdminModule],
  });

  SwaggerModule.setup(SWAGGER_CONFIG.PATH, app, document);
}
