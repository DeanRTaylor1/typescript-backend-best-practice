import { validateRequest } from "@src/middleware/validate-request";
import { Request, Response } from "express";
import { apiRoutes } from "@src/types/api-routes";
import { body } from "express-validator";
import express from "express";
import { BadRequestError } from "@src/errors";
import { createUser, createUserParams } from "@src/db/sql/user";
import { User } from "@src/db/models/user";
import { convertToUserResponse } from "@src/types/user-response";
const router = express.Router();

router.post(
  `${apiRoutes.v1Auth}/signup`,
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
    body("username")
      .trim()
      .not()
      .isEmpty()
      .escape()
      .isLength({ min: 4, max: 20 })
      .withMessage("Username must be between 4 and 20 characters"),
    body("full_name").not().isEmpty().escape(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, username, full_name } = req.body;
    if (!email || !password || !username || !full_name) {
      throw new BadRequestError("missing paramaters");
    }
    let newUser: createUserParams | User = {
      email,
      hashed_password: password,
      username,
      full_name,
    };
    try {
      newUser = await createUser(newUser);

      res.status(201).send(convertToUserResponse(newUser));
    } catch (err) {
      throw new BadRequestError("Error creating user.");
    }
  }
);

export { router as v1SignupRouter };
