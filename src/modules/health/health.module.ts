import { Module } from "@nestjs/common";
import { HealthStoreController } from "./controllers/health.store.controller";

@Module({
  controllers: [HealthStoreController],
})
export class HealthModule {}
