/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors";

//do not delete the nextFunction param even though it is unused as it stops errors being sent in json format,
// I'm guessing under the hood, express async errors uses the function.
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.error(err);
  res.status(400).send({ errors: [{ message: "Something went wrong" }] });
};
