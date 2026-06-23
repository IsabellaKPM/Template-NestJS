import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function GetApiDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Mostrar bienvenida",
      description: "Retorna un mensaje de bienvenida de 'Hello World!'.",
    }),
    ApiResponse({
      status: 200,
      description: "Mensaje de bienvenida retornado correctamente.",
      schema: {
        type: "string",
        example: "Hello World!",
      },
    }),
  );
}
