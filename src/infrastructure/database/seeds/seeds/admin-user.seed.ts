import type { DataSource } from "typeorm";
import { User } from "@modules/users/entities/user.entity";
import { UserRoles } from "@modules/users/enums/user-roles.enum";
import { UserStatus } from "@modules/users/enums/user-status.enum";
import type { Seed } from "../interfaces/seed.interface";

export class AdminUserSeed implements Seed {
  async run(dataSource: DataSource): Promise<void> {
    const { ADMIN_NAME, ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } =
      process.env;

    if (!ADMIN_EMAIL || !ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.warn(
        "ADMIN_EMAIL, ADMIN_USERNAME and ADMIN_PASSWORD are required to seed the admin user. Skipping.",
      );
      return;
    }

    const repository = dataSource.getRepository(User);
    const email = ADMIN_EMAIL.trim().toLowerCase();

    const existing = await repository.findOneBy({ email });
    if (existing) {
      return;
    }

    await repository.save(
      repository.create({
        name: ADMIN_NAME ?? "Admin",
        username: ADMIN_USERNAME,
        email,
        encryptedPassword: ADMIN_PASSWORD,
        role: UserRoles.ADMIN,
        status: UserStatus.ACTIVE,
      }),
    );
  }
}
