import { Module } from "@nestjs/common";
import { HelloWorldModule } from "@modules/hello-world/hello-world.module";
import { HelloWorldClientController } from "@modules/hello-world/controllers/hello-world.client.controller";

@Module({
  imports: [HelloWorldModule],
  controllers: [HelloWorldClientController],
})
export class ApiModule {}
