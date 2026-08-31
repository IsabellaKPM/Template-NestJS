import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { ValidationModule } from "@infrastructure/validation/validation.module";
import { DatabaseModule } from "@infrastructure/database/database.module";
import { HealthModule } from "./health/health.module";
import { ApiModule } from "./api/api.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ValidationModule,
    DatabaseModule,
    HealthModule,
    ApiModule,
    AdminModule,
    RouterModule.register([
      {
        path: "api",
        module: ApiModule,
      },
      {
        path: "admin",
        module: AdminModule,
      },
    ]),
  ],
  controllers: [],
})
export class AppModule {}
