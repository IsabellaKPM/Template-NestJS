import { Module } from "@nestjs/common";
import { HelloWorldModule } from "@modules/hello-world/hello-world.module";
import { HelloWorldClientController } from "@modules/hello-world/controllers/hello-world.client.controller";
import { AuthModule } from "@modules/auth/auth.module";
import { AuthClientController } from "@modules/auth/controllers/auth.client.controller";

@Module({
  imports: [HelloWorldModule, AuthModule],
  controllers: [HelloWorldClientController, AuthClientController],
})
export class ApiModule {}
