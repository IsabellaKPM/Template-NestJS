import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserWithPasswordDto } from "../dtos/user-with-password.dto";
import { UserDto } from "../dtos/user.dto";
import { User } from "../entities/user.entity";
import { SelfModificationException } from "../exceptions/self-modification.exception";
import { UserAlreadyExistsException } from "../exceptions/user-already-exists.exception";
import { UserNotFoundException } from "../exceptions/user-not-found.exception";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find({ order: { name: "ASC" } });
    return users.map((user) => UserDto.fromEntity(user));
  }

  async findById(userId: string): Promise<UserDto> {
    const user = await this.findByIdOrNull(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async findByIdOrNull(userId: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOneBy({ id: userId });
    return user ? UserDto.fromEntity(user) : null;
  }

  async findByEmailWithPassword(
    email: string,
  ): Promise<UserWithPasswordDto | null> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .addSelect("user.encryptedPassword")
      .getOne();

    return user
      ? {
          ...UserDto.fromEntity(user),
          encryptedPassword: user.encryptedPassword,
        }
      : null;
  }

  async findByUsernameWithPassword(
    username: string,
  ): Promise<UserWithPasswordDto | null> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username })
      .addSelect("user.encryptedPassword")
      .getOne();

    return user
      ? {
          ...UserDto.fromEntity(user),
          encryptedPassword: user.encryptedPassword,
        }
      : null;
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    await this.assertUnique({ email: dto.email, username: dto.username });

    const { password, ...fields } = dto;
    const user = this.userRepository.create({
      ...fields,
      encryptedPassword: password,
    });
    const saved = await this.userRepository.save(user);

    return UserDto.fromEntity(saved);
  }

  async update(
    userId: string,
    dto: UpdateUserDto,
    actingUserId: string,
  ): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UserNotFoundException();
    }

    if (userId === actingUserId) {
      this.assertNoSelfDemotion(user, dto);
    }

    await this.assertUnique(
      {
        email: dto.email !== user.email ? dto.email : undefined,
        username: dto.username !== user.username ? dto.username : undefined,
      },
      userId,
    );

    const { password, ...fields } = dto;
    Object.assign(user, fields);
    if (password) {
      user.encryptedPassword = password;
    }
    const saved = await this.userRepository.save(user);

    return UserDto.fromEntity(saved);
  }

  async remove(userId: string, actingUserId: string): Promise<void> {
    if (userId === actingUserId) {
      throw new SelfModificationException();
    }

    const result = await this.userRepository.delete({ id: userId });
    if (!result.affected) {
      throw new UserNotFoundException();
    }
  }

  private assertNoSelfDemotion(user: User, dto: UpdateUserDto): void {
    const changesRole = dto.role !== undefined && dto.role !== user.role;
    const changesStatus =
      dto.status !== undefined && dto.status !== user.status;

    if (changesRole || changesStatus) {
      throw new SelfModificationException();
    }
  }

  private async assertUnique(
    fields: { email?: string; username?: string },
    excludeUserId?: string,
  ): Promise<void> {
    if (fields.email) {
      const existing = await this.userRepository.findOneBy({
        email: fields.email,
      });
      if (existing && existing.id !== excludeUserId) {
        throw new UserAlreadyExistsException("email");
      }
    }

    if (fields.username) {
      const existing = await this.userRepository.findOneBy({
        username: fields.username,
      });
      if (existing && existing.id !== excludeUserId) {
        throw new UserAlreadyExistsException("username");
      }
    }
  }
}
