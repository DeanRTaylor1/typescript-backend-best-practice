import { validateRequest } from "@src/middleware/validate-request";
import { Request, Response } from "express";
import { apiRoutes } from "@src/types/api-routes";
import { body } from "express-validator";
import express from "express";
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
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.status(201).send("Hello World");
  }
);

export { router as v1SignupRouter };
