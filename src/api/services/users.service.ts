import UsersRepository from "@repositories/users.repository";
import User from "api/models/entities/User.entity";
import { IUser } from "api/models/entities/types/entity.types";
import { Service } from "typedi";

@Service()
class UsersService {
  constructor(protected usersRepository: UsersRepository) {}

  public async getAllUsers(): Promise<Array<User>> {
    return this.usersRepository.getAll();
  }

  public async createUser(user: IUser): Promise<User> {
    return this.usersRepository.create(user);
  }
}

export { UsersService };
