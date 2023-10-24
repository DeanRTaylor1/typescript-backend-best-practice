import { StatusCodeEnum } from "api/enum/api.enum";
import { HttpException } from "api/errors/HttpException";
import {  plainToInstance, ClassConstructor } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";

function validationMiddleware<T extends object>(
  type: ClassConstructor<T>,
  value: string | "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => {
            if (error.constraints) {
              return Object.values(error.constraints);
            } else if (error.children && error.children.length > 0) {
              return error.children
                .map((child) => Object.values(child.constraints || {}))
                .join(", ");
            } else {
              return "";
            }
          })
          .join(", ");

        next(new HttpException(StatusCodeEnum.VALIDATION_ERROR, message));
      } else {
        next();
      }
    });
  };
}

export default validationMiddleware;