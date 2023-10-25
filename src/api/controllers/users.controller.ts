import { BaseController } from "./base.controller";
import User from "api/models/entities/User.entity";
import { UsersService } from "api/services/users.service";
import { BodyToCamelCase } from "@decorators/SnakeToCamel.decorator";
import { CreateUserDTO } from "api/validation/DTO/user.dto";
import validationMiddleware from "middlewares/validation.middleware";
import { CamelCaseObj } from "@lib/validation/types";
import { logger } from "@lib/debug/logger";
import { HttpException } from "api/errors/HttpException";
import { StatusCodeEnum } from "api/enum/api.enum";

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

@JsonController("/users")
@Service()
class UsersController extends BaseController {
  constructor(protected usersService: UsersService) {
    super();
  }

  @Get("/")
  public async getUsers(
    @Req() _: Request,
    @Res() res: Response
  ): Promise<Response> {
    const users = await this.usersService.getAllUsers();

    return this.responseSuccess<Array<User>>(users, "Success", res);
  }

  @Post("/")
  @UseBefore(validationMiddleware(CreateUserDTO))
  public async createUser(
    @BodyToCamelCase() body: CamelCaseObj<CreateUserDTO>,
    @Req() _: Request,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const user = await this.usersService.createUser(body);

      return this.responseSuccess<User>(user, "Success", res);
    } catch (error: unknown) {
      logger.error(error);

      throw new HttpException(
        StatusCodeEnum.INTERNAL_SERVER_ERROR,
        "Something went wrong."
      );
    }
  }
}

export { UsersController };
