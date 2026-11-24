import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@core/constants/swagger.constant";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { UserRoles } from "../enums/user-roles.enum";
import { UserService } from "../services/user.service";
import {
  GetAllUsersDocs,
  GetUserDocs,
  PostUserDocs,
  PatchUserDocs,
  DeleteUserDocs,
} from "../decorators/user.admin.docs";
import { UserDto } from "../dtos/user.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";

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

  @Get(":id")
  @GetUserDocs()
  async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<UserDto> {
    return this.userService.findById(id);
  }

  @Post()
  @PostUserDocs()
  async create(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(dto);
  }

  @Patch(":id")
  @PatchUserDocs()
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() actingUser: UserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, dto, actingUser.id);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteUserDocs()
  async remove(
    @Param("id", ParseUUIDPipe) id: string,
    @CurrentUser() actingUser: UserDto,
  ): Promise<void> {
    await this.userService.remove(id, actingUser.id);
  }
}
