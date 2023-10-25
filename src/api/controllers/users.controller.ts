import { BaseController } from "./base.controller";
import User from "api/models/entities/User.entity";
import { UsersService } from "api/services/users.service";
import { BodyToCamelCase } from "@decorators/SnakeToCamel.decorator";
import { CreateUserDTO, LoginDTO } from "api/validation/DTO/user.dto";
import validationMiddleware from "middlewares/validation.middleware";
import { CamelCaseObj } from "@lib/validation/types";
import { HandleErrors } from "@decorators/errorHandler.decorator";
import { GetPagination, Pagination } from "@decorators/pagination.decorator";
import { AuthService } from "@services/auth.service";

import { Request, Response } from "express";
import {
  Body,
  Get,
  JsonController,
  Post,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { Service } from "typedi";
import authMiddleware from "middlewares/auth.middleware";
import { RequestWithUser } from "api/types/request.interface";

@JsonController("/users")
@Service()
class UsersController extends BaseController {
  constructor(
    protected usersService: UsersService,
    protected authService: AuthService
  ) {
    super();
  }

  @Get("/")
  @UseBefore(authMiddleware())
  @HandleErrors
  public async getUsers(
    @GetPagination() { skip, limit }: Pagination,
    @Req() { user }: RequestWithUser,
    @Res() res: Response
  ): Promise<Response> {
    console.log({ user });
    const users = await this.usersService.getAllUsers({ skip, limit });

    return this.responseSuccess<Array<User>>({
      data: users,
      message: "Success",
      res,
    });
  }

  @Post("/")
  @UseBefore(validationMiddleware(CreateUserDTO))
  @HandleErrors
  public async createUser(
    @BodyToCamelCase() body: CamelCaseObj<CreateUserDTO>,
    @Req() _: Request,
    @Res() res: Response
  ): Promise<Response> {
    const user = await this.usersService.createUser(body);

    return this.responseSuccess<User>({ data: user, message: "Success", res });
  }

  @Post("/login")
  @UseBefore(validationMiddleware(LoginDTO))
  @HandleErrors
  public async login(
    @Body() { email, password }: LoginDTO,
    @Req() _: Request,
    @Res() res: Response
  ): Promise<Response> {
    const token = await this.usersService.loginUser(email, password);

    return this.responseSuccess<{ token: string }>({
      data: { token },
      message: "Success",
      res,
    });
  }
}

export { UsersController };
