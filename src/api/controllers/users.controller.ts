import { BaseController } from "./base.controller";
import { Request, Response } from "express";
import User from "api/models/entities/User.entity";
import { IUser } from "api/models/entities/types/entity.types";
import { UsersService } from "api/services/users.service";

import { Body, Get, JsonController, Post, Req, Res } from "routing-controllers";
import { Service } from "typedi";

@JsonController("/users")
@Service()
class UsersController extends BaseController {
  constructor(protected usersService: UsersService) {
    super();
  }

  @Get("/")
  public async getUsers(@Req() _: Request, @Res() res: Response) {
    const users = await this.usersService.getAllUsers();

    return this.responseSuccess<Array<User>>(users, "Success", res);
  }

  @Post("/")
  public async createUser(
    @Body() { firstName, lastName, email }: IUser,
    @Req() _: Request,
    @Res() res: Response
  ) {
    const user = await this.usersService.createUser({
      firstName,
      lastName,
      email,
    });

    return this.responseSuccess<User>(user, "Success", res);
  }
}

export { UsersController };
