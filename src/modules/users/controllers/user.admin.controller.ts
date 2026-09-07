import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@core/constants/swagger.constant";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { UserRoles } from "../enums/user-roles.enum";
import { UserService } from "../services/user.service";
import { GetAllUsersDocs } from "../decorators/user.admin.docs";
import { UserDto } from "../dtos/user.dto";

@ApiTags(API_TAGS.USERS)
@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN)
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @GetAllUsersDocs()
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }
}
