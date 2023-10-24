import { CamelCaseObj } from "@lib/validation/types";
import UsersRepository from "@repositories/users.repository";
import User from "api/models/entities/User.entity";
import { IUser } from "api/models/entities/types/entity.types";
import { CreateUserDTO } from "api/validation/DTO/user.dto";
import { Service } from "typedi";

@Service()
class UsersService {
  constructor(protected usersRepository: UsersRepository) {}

  public async getAllUsers(): Promise<Array<User>> {
    return this.usersRepository.getAll();
  }

  public async createUser(userDTO: CamelCaseObj<CreateUserDTO>): Promise<User> {
    const newUser = this.hashUserPassword(userDTO);

    return this.usersRepository.create(newUser);
  }

  private hashUserPassword(userDTO: CamelCaseObj<CreateUserDTO>): IUser {
    return {
      ...userDTO,
      hashedPassword: userDTO.password,
    };
  }
}

export { UsersService };
