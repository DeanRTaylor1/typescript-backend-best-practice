import { Pagination } from "@decorators/pagination.decorator";
import { CamelCaseObj } from "@lib/validation/types";
import UsersRepository from "@repositories/users.repository";
import User from "api/models/entities/User.entity";
import { CreateUserDTO } from "api/validation/DTO/user.dto";
import { Service } from "typedi";
import { AuthService } from "./auth.service";
import { ICreateAttributes } from "api/models/entities/types/entity.types";
import { StatusCodeEnum } from "api/enum/api.enum";
import { HttpException } from "api/errors/HttpException";

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

  public async findUserById(userId: number): Promise<User> {
    return this.usersRepository.findById(userId);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }

  public async loginUser(
    email: string,
    suppliedPassword: string
  ): Promise<string> {
    const { id: userId, hashedPassword } = await this.getUserByEmail(email);

    const isValid = await this.authService.compare({
      storedPassword: hashedPassword,
      suppliedPassword,
    });

    if (!isValid) {
      throw new HttpException(StatusCodeEnum.FORBIDDEN, "Invalid password");
    }

    return this.authService.generateJWT({
      userId,
      email,
    });
  }

  private async hashUserPassword(
    userDTO: CamelCaseObj<CreateUserDTO>
  ): Promise<ICreateAttributes<User>> {
    const hashedPassword = await this.authService.hashPassword(
      userDTO.password
    );
    return {
      ...userDTO,
      hashedPassword,
    };
  }
}

export { UsersService };
