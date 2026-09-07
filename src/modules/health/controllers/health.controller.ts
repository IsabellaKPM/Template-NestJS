import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@core/constants/swagger.constant";
import { GetHealthDocs } from "../decorators/health.docs";
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
