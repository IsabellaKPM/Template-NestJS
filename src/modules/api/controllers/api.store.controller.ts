import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetApiDocs } from "../decorators/api.docs";
import { API_TAGS } from "@core/constants";

@ApiTags(API_TAGS.HEALTH)
@Controller()
export class ApiStoreController {
  @Get()
  @GetApiDocs()
  getHello(): string {
    return "Hello World!";
  }
}
