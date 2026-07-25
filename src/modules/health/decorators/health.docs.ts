import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function GetHealthDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Verify the health status of the API",
      description:
        "Returns the current status of the API and its availability.",
    }),

    ApiResponse({
      status: 200,
      description: "The API is healthy and available.",
      schema: {
        type: "object",
        properties: {
          status: { type: "string", example: "ok" },
          timestamp: { type: "string", example: "2026-04-20T10:00:00Z" },
        },
      },
    }),

    ApiResponse({
      status: 503,
      description: "The service is not available.",
    }),
  );
}
