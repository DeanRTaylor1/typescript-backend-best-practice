import { UserRoleEnum, UserStatusEnum } from "api/enum/users.enum";
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  Default,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "users",
})
export default class User extends Model<User> {
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
}
