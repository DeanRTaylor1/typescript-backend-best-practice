/* eslint-disable @typescript-eslint/no-namespace */

import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { payload, verifyToken } from "../util";

declare global {
  //augment global interface Request
  namespace Express {
    interface Request {
      currentUser?: payload;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log(req.currentUser, req.headers, req.session)
  const authType = req.headers.authorization;

  if (!authType) {
    throw new NotAuthorizedError();
  }

  const fields = authType.split(" ");

  if (fields.length < 2) {
    throw new NotAuthorizedError();
  }

  if (fields[0] != "Bearer") {
    throw new NotAuthorizedError();
  }

  const access_token = fields[1];
  try {
    const payload = await verifyToken(access_token);
    console.log(payload);
    if (!payload) {
      throw new NotAuthorizedError();
    }
    req.currentUser = payload;
    next();
  } catch (err) {
    throw new NotAuthorizedError();
  }
};
