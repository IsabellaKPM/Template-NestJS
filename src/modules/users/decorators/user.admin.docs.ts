import { applyDecorators, HttpStatus } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { UserDto } from "../dtos/user.dto";

const adminOnly = () =>
  applyDecorators(
    ApiCookieAuth("access_token"),
    ApiUnauthorizedResponse({
      description: "Unauthorized access. Please provide valid credentials.",
    }),
    ApiForbiddenResponse({
      description:
        "Forbidden. You do not have permission to access this resource.",
    }),
  );

const idParam = () =>
  ApiParam({ name: "id", format: "uuid", description: "User id" });

export function GetAllUsersDocs() {
  return applyDecorators(
    adminOnly(),
    ApiOperation({
      summary: "Get All Users",
      description: "Returns a list of all users in the system.",
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: "Successfully retrieved the list of users.",
      type: [UserDto],
    }),
  );
}

export function GetUserDocs() {
  return applyDecorators(
    adminOnly(),
    idParam(),
    ApiOperation({ summary: "Get a user by id" }),
    ApiResponse({ status: HttpStatus.OK, type: UserDto }),
    ApiNotFoundResponse({ description: "User not found" }),
  );
}

export function PostUserDocs() {
  return applyDecorators(
    adminOnly(),
    ApiOperation({
      summary: "Create a user",
      description: "Admins can choose the role and status of the new user.",
    }),
    ApiResponse({ status: HttpStatus.CREATED, type: UserDto }),
    ApiBadRequestResponse({ description: "Validation failed" }),
    ApiConflictResponse({ description: "Email or username already in use" }),
  );
}

export function PatchUserDocs() {
  return applyDecorators(
    adminOnly(),
    idParam(),
    ApiOperation({
      summary: "Update a user",
      description:
        "Partial update. Sending a password replaces it. Admins cannot change their own role or status.",
    }),
    ApiResponse({ status: HttpStatus.OK, type: UserDto }),
    ApiBadRequestResponse({ description: "Validation failed" }),
    ApiNotFoundResponse({ description: "User not found" }),
    ApiConflictResponse({ description: "Email or username already in use" }),
  );
}

export function DeleteUserDocs() {
  return applyDecorators(
    adminOnly(),
    idParam(),
    ApiOperation({
      summary: "Delete a user",
      description: "Admins cannot delete themselves.",
    }),
    ApiNoContentResponse({ description: "User deleted" }),
    ApiNotFoundResponse({ description: "User not found" }),
  );
}
