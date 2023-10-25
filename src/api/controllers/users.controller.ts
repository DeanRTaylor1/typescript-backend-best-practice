import { BaseController } from "./base.controller";
import User from "api/models/entities/User.entity";
import { UsersService } from "api/services/users.service";
import { BodyToCamelCase } from "@decorators/SnakeToCamel.decorator";
import { CreateUserDTO } from "api/validation/DTO/user.dto";
import validationMiddleware from "middlewares/validation.middleware";
import { CamelCaseObj } from "@lib/validation/types";

import { Request, Response } from "express";
import {
  Get,
  JsonController,
  Post,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { Service } from "typedi";
import { HandleErrors } from "@decorators/errorHandler.decorator";
import { GetPagination, Pagination } from "@decorators/pagination.decorator";
import authMiddleware from "middlewares/auth.middleware";

@JsonController("/users")
@Service()
class UsersController extends BaseController {
  constructor(protected usersService: UsersService) {
    super();
  }

  @Get("/")
  @UseBefore(authMiddleware())
  @HandleErrors
  public async getUsers(
    @GetPagination() { skip, limit }: Pagination,
    @Req() _: Request,
    @Res() res: Response
  ): Promise<Response> {
    const users = await this.usersService.getAllUsers({ skip, limit });

    return this.responseSuccess<Array<User>>(users, "Success", res);
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

    return this.responseSuccess<User>(user, "Success", res);
  }
}

export { UsersController };
