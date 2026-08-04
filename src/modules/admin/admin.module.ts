import { Module } from "@nestjs/common";
import { HelloWorldModule } from "@modules/hello-world/hello-world.module";
import { HelloWorldAdminController } from "@modules/hello-world/controllers/hello-word.admin.controller";

@Module({
  imports: [HelloWorldModule],
  controllers: [HelloWorldAdminController],
})
export class AdminModule {}
