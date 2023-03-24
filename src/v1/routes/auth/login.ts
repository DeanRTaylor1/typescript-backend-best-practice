/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";

import { body } from "express-validator";
import express from "express";
import { apiRoutes } from "../../../types/api-routes";
import { validateRequest } from "../../../middleware/validate-request";
import { BadRequestError } from "../../../errors";
import { getUser } from "../../../db/sql";
import { createToken, Password } from "../../../util";
import { convertToUserResponse } from "../../../db/models/user";
import { dbSession } from "../../../db/models/sessions";
import { createSession } from "../../../db/sql/session.sql";

const router = express.Router();

router.post(
  `${apiRoutes.v1Auth}/login`,
  [
    body("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Email must be valid")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // console.log(req.currentUser);
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("missing paramaters");
    }

    try {
      const user = await getUser(email);

      const result = await Password.compare(user.hashed_password, password);

      if (!result) {
        throw new BadRequestError("Invalid credentials");
      }

      const { token: access_token, payload: access_token_payload } =
        await createToken(
          user.id,
          user.username,
          user.email,
          +process.env.ACCESS_TOKEN_DURATION!
        );

      const { token: refresh_token, payload: refresh_payload } =
        await createToken(
          user.id,
          user.username,
          user.email,
          +process.env.REFRESH_TOKEN_DURATION!
        );

      const dbSession: dbSession = await createSession(
        refresh_payload.id,
        user.email,
        refresh_token,
        req.headers["user-agent"]!,
        req.ip,
        new Date(refresh_payload.expires_at)
      );

      res.status(200).send({
        session_id: dbSession.id,
        access_token,
        access_token_expires_at: new Date(
          access_token_payload.expires_at
        ).toLocaleString(),
        refresh_token: refresh_token,
        refresh_token_expires_at: new Date(
          refresh_payload.expires_at
        ).toLocaleString(),
        user: convertToUserResponse(user),
      });
    } catch (error) {
      console.log("error");
      throw new BadRequestError("Invalid credentials");
    }
  }
);

export { router as v1LoginRouter };
