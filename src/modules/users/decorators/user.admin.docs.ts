import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserDto } from "../dtos/user.dto";

export function GetAllUsersDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Get All Users",
      description: "Returns a list of all users in the system.",
    }),

    ApiResponse({
      status: 200,
      description: "Successfully retrieved the list of users.",
      type: [UserDto],
    }),

    ApiResponse({
      status: 401,
      description: "Unauthorized access. Please provide valid credentials.",
    }),

    ApiResponse({
      status: 403,
      description:
        "Forbidden. You do not have permission to access this resource.",
    }),
  );
}
