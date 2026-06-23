import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function GetHealthDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Verificar el estado de la aplicación",
      description: "Retorna el estado actual de la API y su disponibilidad.",
    }),

    ApiResponse({
      status: 200,
      description: "La aplicación está funcionando correctamente.",
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
      description: "El servicio no está disponible.",
    }),
  );
}
