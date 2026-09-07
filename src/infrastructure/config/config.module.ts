import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appConfig } from "./configs/app.config";
import { databaseConfig } from "./configs/database.config";
import { jwtConfig } from "./configs/jwt.config";
import { envValidationSchema } from "./validations/env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
      validationSchema: envValidationSchema,
      validationOptions: { abortEarly: false },
    }),
  ],
})
export class ValidationModule {}
