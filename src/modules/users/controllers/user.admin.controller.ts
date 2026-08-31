import { Controller, Post, UseGuards, Body } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { UserRoles } from "../enums/user-roles.enum";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@core/constants";

@ApiTags(API_TAGS.USERS)
@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class UserAdminController {
  @Post()
  public async createUser(@Body() dto: CreateUserDto) {
    // TODO: Implement logic to create a new user
  }
}
