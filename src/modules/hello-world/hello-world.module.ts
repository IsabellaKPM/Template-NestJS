import { Module } from "@nestjs/common";
import { HelloWorldService } from "./services/hello-world.service";

@Module({
  providers: [HelloWorldService],
  exports: [HelloWorldService],
})
export class HelloWorldModule {}
