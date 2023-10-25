import { Pagination } from "@decorators/pagination.decorator";
import { CamelCaseObj } from "@lib/validation/types";
import UsersRepository from "@repositories/users.repository";
import User from "api/models/entities/User.entity";
import { CreateUserDTO } from "api/validation/DTO/user.dto";
import { Service } from "typedi";
import { AuthService } from "./auth.service";
import { ICreateAttributes } from "api/models/entities/types/entity.types";

@Service()
class UsersService {
  constructor(
    protected usersRepository: UsersRepository,
    protected authService: AuthService
  ) {}

  public async getAllUsers({ skip, limit }: Pagination): Promise<Array<User>> {
    return this.usersRepository.getAll({ skip, limit });
  }

  public async createUser(userDTO: CamelCaseObj<CreateUserDTO>): Promise<User> {
    const newUser = await this.hashUserPassword(userDTO);

    return this.usersRepository.create(newUser);
  }

  private async hashUserPassword(
    userDTO: CamelCaseObj<CreateUserDTO>
  ): Promise<ICreateAttributes<User>> {
    const hashedPassword = await this.authService.hashpassword(
      userDTO.password
    );
    return {
      ...userDTO,
      hashedPassword,
    };
  }
}

export { UsersService };
