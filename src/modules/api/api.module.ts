import { Module } from "@nestjs/common";
import { ValidationModule } from "@infrastructure/validation/validation.module";
import { DatabaseModule } from "@infrastructure/database/database.module";
import { ApiStoreController } from "./controllers/api.store.controller";
import { HealthModule } from "@modules/health/health.module";

@Module({
  imports: [ValidationModule, DatabaseModule, HealthModule],
  controllers: [ApiStoreController],
})
export class ApiModule {}
