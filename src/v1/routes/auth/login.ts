import { validateRequest } from "@src/middleware/validate-request";
import { Request, Response } from "express";
import { apiRoutes } from "@src/types/api-routes";
import { body } from "express-validator";
import express from "express";
import { BadRequestError } from "@src/errors";
import { createUser, createUserParams, getUser } from "@src/db/sql/user";
import { User } from "@src/db/models/user";
import { convertToUserResponse } from "@src/types/user-response";
import { Password } from "@src/util/password";
import { createToken } from "@src/util/paseto";
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
    console.log(req.currentUser);
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("missing paramaters");
    }

    const user = await getUser(email);
    if (!user) {
      throw new BadRequestError("Unable to log in");
    }
    if (!user.hashed_password) {
      throw new BadRequestError("Unable to log in.");
    }
    const result = await Password.compare(user.hashed_password, password);

    if (!result) {
      throw new BadRequestError("Unable to log in.");
    }

    const access_token = await createToken(user.username, user.email, 15);

    res.status(201).send({ access_token, user: convertToUserResponse(user) });
  }
);

export { router as v1LoginRouter };
