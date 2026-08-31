import { Repository } from "typeorm";
import { UserWithPasswordDto } from "../dtos/user-with-password.dto";
import { UserDto } from "../dtos/user.dto";
import { User } from "../entities/user.entity";
import { UserNotFoundException } from "../exceptions/user-not-found.exception";

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async findById(userId: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async findByEmailWithPassword(email: string): Promise<UserWithPasswordDto> {
    const userWithPassword = await this.userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .addSelect("user.encryptedPassword")
      .getOne();
    if (!userWithPassword) {
      throw new UserNotFoundException();
    }

    return userWithPassword;
  }

  async findByUsernameWithPassword(
    username: string,
  ): Promise<UserWithPasswordDto> {
    const userWithPassword = await this.userRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username })
      .addSelect("user.encryptedPassword")
      .getOne();
    if (!userWithPassword) {
      throw new UserNotFoundException();
    }

    return userWithPassword;
  }
}
