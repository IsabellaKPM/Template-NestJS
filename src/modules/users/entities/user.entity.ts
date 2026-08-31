import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { UserRoles } from "../enums/user-roles.enum";
import { UserStatus } from "../enums/user-status.enum";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id!: string;

  @Column({ type: "varchar", name: "name", length: 255, nullable: false })
  name!: string;

  @Column({
    type: "varchar",
    name: "username",
    length: 255,
    unique: true,
    nullable: false,
  })
  username!: string;

  @Column({
    type: "varchar",
    name: "email",
    length: 255,
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column({
    type: "varchar",
    name: "encrypted_password",
    length: 255,
    nullable: false,
    select: false,
  })
  encryptedPassword!: string;

  @Column({
    type: "enum",
    enum: UserRoles,
    name: "role",
    default: UserRoles.USER,
    nullable: false,
  })
  role!: UserRoles;

  @Column({
    type: "enum",
    enum: UserStatus,
    name: "status",
    default: UserStatus.ACTIVE,
    nullable: false,
  })
  status!: UserStatus;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.encryptedPassword) {
      const salt = await bcrypt.genSalt(10);
      this.encryptedPassword = await bcrypt.hash(this.encryptedPassword, salt);
    }
  }
}
