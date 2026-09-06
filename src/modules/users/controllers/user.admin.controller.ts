import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { UserRoles } from "../enums/user-roles.enum";
import { ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@core/constants";
import { UserService } from "../services/user.service";
import { GetAllUsersDocs } from "../decorators/user.admin.docs";

@ApiTags(API_TAGS.USERS)
@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @GetAllUsersDocs()
  async findAll() {
    return this.userService.findAll();
  }
}
