import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@core/constants";
import { HelloWorldService } from "../services/hello-world.service";
import { GetHelloWorldDocs } from "../decorators/hello-world.client.docs";

@ApiTags(API_TAGS.HEALTH)
@Controller("")
export class HelloWorldClientController {
  constructor(private readonly helloWorldService: HelloWorldService) {}

  @Get()
  @GetHelloWorldDocs()
  public getHelloWorld(): string {
    return this.helloWorldService.getHelloWorld();
  }
}
