import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { User } from "@modules/users/entities/user.entity";
import { UserStatus } from "@modules/users/enums/user-status.enum";
import { UserRoles } from "@modules/users/enums/user-roles.enum";

type CreateMockUserParams = Partial<User>;

export async function createMockUser(
  userRepo: Repository<User>,
  overrides: CreateMockUserParams = {},
): Promise<User> {
  const uniqueSuffix = randomUUID().substring(0, 8);

  const user = userRepo.create({
    email: `user-${uniqueSuffix}@example.com`,
    name: `User ${uniqueSuffix}`,
    encryptedPassword: `password-${uniqueSuffix}`,
    status: UserStatus.ACTIVE,
    role: UserRoles.USER,
    ...overrides,
  });

  return await userRepo.save(user);
}
