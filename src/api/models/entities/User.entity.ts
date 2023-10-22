import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "users",
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
