import { Service } from "typedi";
import { BaseRepository } from "./base.repository";
import User from "api/models/entities/User.entity";
import { ModelContainer } from "api/decorators/models.decorator";
import { ModelCtor } from "sequelize-typescript";

@Service()
export default class UsersRepository extends BaseRepository<User> {
  constructor(@ModelContainer(User.tableName) User: ModelCtor<User>) {
    super(User);
  }

  createUser({ firstName, lastName, email }) {
    return this.model.create({ firstName, lastName, email });
  }
}
