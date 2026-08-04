import { Controller, Get } from "@nestjs/common";
import { GetHealthDocs } from "../decorators/health.docs";
import { ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@core/constants";
import { HealthDto } from "../dtos/health.dto";

@ApiTags(API_TAGS.HEALTH)
@Controller("health")
export class HealthController {
  @Get()
  @GetHealthDocs()
  check(): HealthDto {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
