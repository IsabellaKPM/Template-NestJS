import { Module } from "@nestjs/common";
import { HelloWorldModule } from "@modules/hello-world/hello-world.module";
import { HelloWorldAdminController } from "@modules/hello-world/controllers/hello-word.admin.controller";
import { UserModule } from "@modules/users/user.module";
import { UserAdminController } from "@modules/users/controllers/user.admin.controller";

@Module({
  imports: [HelloWorldModule, UserModule],
  controllers: [HelloWorldAdminController, UserAdminController],
})
export class AdminModule {}
