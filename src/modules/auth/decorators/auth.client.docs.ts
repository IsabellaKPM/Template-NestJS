import { applyDecorators, HttpCode, HttpStatus } from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiBody,
} from "@nestjs/swagger";
import { LoginRequestDto } from "../dtos/login-request.dto";
import { UserDto } from "@modules/users/dtos/user.dto";
import { MessageResponseDto } from "@core/dtos/message-response.dto";

export function PostLoginDocs() {
  return applyDecorators(
    ApiOperation({ summary: "Authenticate user and set secure cookies" }),
    HttpCode(HttpStatus.OK),
    ApiBody({ type: LoginRequestDto }),
    ApiResponse({
      status: HttpStatus.OK,
      description:
        "Login successful. Returns user summary and sets HTTP-only cookies.",
      type: UserDto,
    }),
    ApiBadRequestResponse({
      description: "Validation failed (e.g., missing email or password)",
    }),
    ApiUnauthorizedResponse({
      description: "Invalid credentials or user is inactive",
    }),
  );
}

export function PostRefreshDocs() {
  return applyDecorators(
    ApiOperation({ summary: "Refresh access token using refresh cookie" }),
    HttpCode(HttpStatus.OK),
    ApiCookieAuth("refresh_token"),
    ApiResponse({
      status: HttpStatus.OK,
      description: "Tokens refreshed successfully. New cookies set.",
      type: MessageResponseDto,
    }),
    ApiUnauthorizedResponse({
      description: "Refresh token is missing, invalid, or expired",
    }),
  );
}

export function PostLogoutDocs() {
  return applyDecorators(
    ApiOperation({ summary: "Clear authentication cookies" }),
    HttpCode(HttpStatus.OK),
    ApiCookieAuth("access_token"),
    ApiResponse({
      status: HttpStatus.OK,
      description: "Logout successful. Auth cookies cleared.",
      type: MessageResponseDto,
    }),
    ApiUnauthorizedResponse({ description: "User is not authenticated" }),
  );
}

export function GetMeDocs() {
  return applyDecorators(
    ApiOperation({ summary: "Retrieve current authenticated user profile" }),
    HttpCode(HttpStatus.OK),
    ApiCookieAuth("access_token"),
    ApiResponse({
      status: HttpStatus.OK,
      description:
        "Returns the full profile of the currently authenticated user.",
      type: UserDto,
    }),
    ApiUnauthorizedResponse({
      description: "User is not authenticated or token is invalid",
    }),
  );
}
