import { UserRoleEnum, UserStatusEnum } from "api/enum/users.enum";
import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Default,
  DataType,
  Model,
} from "sequelize-typescript";
import BaseEntity from "./types/Base.entity";
import { convertKeysToSnakeCase } from "@lib/validation/utils";
import { SnakeCaseObj } from "@lib/validation/types";

@Table({
  tableName: "users",
})
export default class User extends Model<User> implements BaseEntity<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  firstName: string | null;

  @Column(DataType.STRING)
  lastName: string | null;

  @Column(DataType.STRING)
  email: string;

  @Default(UserStatusEnum.INACTIVE)
  @Column(DataType.ENUM({ values: Object.values(UserStatusEnum) }))
  status: UserStatusEnum;

  @Default(UserRoleEnum.USER)
  @Column(DataType.ENUM({ values: Object.values(UserRoleEnum) }))
  role: UserRoleEnum;

  @Column(DataType.STRING)
  hashedPassword: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  toSnake() {
    return convertKeysToSnakeCase(this.get()) as SnakeCaseObj<this>;
  }
}
