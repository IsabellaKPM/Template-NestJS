import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function GetHelloWorldDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Greet the Admin",
      description: "Returns a greeting message for the admin user.",
    }),

    ApiResponse({
      status: 200,
      description: "The endpoint is working correctly.",
      type: String,
    }),

    ApiResponse({
      status: 503,
      description: "The service is not available.",
    }),
  );
}
