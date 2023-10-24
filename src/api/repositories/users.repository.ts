import { BaseRepository } from "./base.repository";
import { ModelContainer } from "api/decorators/models.decorator";
import { IUser } from "api/models/entities/types/entity.types";

import User from "api/models/entities/User.entity";
import { Service } from "typedi";
import { ModelCtor } from "sequelize-typescript";

@Service()
class UsersRepository extends BaseRepository<User> {
  constructor(@ModelContainer(User.tableName) User: ModelCtor<User>) {
    super(User);
  }

  async create({ firstName, lastName, email }: IUser): Promise<User> {
    return this.model.create({ firstName, lastName, email });
  }
}

export default UsersRepository;
