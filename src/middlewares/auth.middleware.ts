import { StatusCodeEnum } from "api/enum/api.enum";
import { AuthService } from "@services/auth.service";
import { UsersService } from "@services/users.service";
import { HttpException } from "api/errors/HttpException";
import { RequestWithUser } from "api/types/request.interface";
import { NextFunction } from "express";
import { Container } from "typedi";

function authMiddleware(_action?: object) {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authService = Container.get(AuthService);
    const userService = Container.get(UsersService);
    const { authorization } = req.headers;

    if (!authorization) {
      return next(
        new HttpException(
          StatusCodeEnum.FORBIDDEN,
          "Authentication token missing."
        )
      );
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return next(
        new HttpException(
          StatusCodeEnum.FORBIDDEN,
          "Middleware.authentication_token_missing"
        )
      );
    }

    try {
      const { userId } = await authService.validateJWT(token);
      const user = await userService.findUserById(userId);
      req.user = user;
      next();
    } catch (error: unknown) {
      return next(
        new HttpException(StatusCodeEnum.FORBIDDEN, "Invalid token.")
      );
    }
  };
}

export default authMiddleware;
