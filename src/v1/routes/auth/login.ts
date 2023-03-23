import { Request, Response } from "express";

import { body } from "express-validator";
import express from "express";
import { apiRoutes } from "../../../types/api-routes";
import { validateRequest } from "../../../middleware/validate-request";
import { BadRequestError } from "../../../errors";
import { getUser } from "../../../db/sql";
import { createToken, Password } from "../../../util";
import { convertToUserResponse } from "../../../db/models/user";

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

    const access_token = await createToken(
      user.id,
      user.username,
      user.email,
      15
    );

    res.status(200).send({ access_token, user: convertToUserResponse(user) });
  }
);

export { router as v1LoginRouter };
