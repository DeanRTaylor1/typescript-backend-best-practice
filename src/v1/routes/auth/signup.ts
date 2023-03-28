/**
 * @api {post} /v1/auth/signup Signup
 * @apiName Signup
 * @apiGroup Authentication
 *
 * @apiParam {String} email User's email address.
 * @apiParam {String} password User's password.
 * @apiParam {String} username User's username.
 * @apiParam {String} full_name User's full name.
 *
 * @apiSuccess {Object} user User object containing user details.
 * @apiSuccess {String} user.email User's email address.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} user.full_name User's full name.
 *
 * @apiError (400 Bad Request) MissingParameters One or more required parameters are missing.
 */

import { Request, Response } from "express";

import { body } from "express-validator";
import express from "express";
import { apiRoutes } from "../../../types/api-routes";
import { validateRequest } from "../../../middleware/validate-request";
import { BadRequestError } from "../../../errors";
import { Password } from "../../../util";
import { convertToUserResponse, dbUser } from "../../../db/models/user";
import { createAccount, createUser } from "../../../db/sql";
import { currency } from "../../../types/currency";

const router = express.Router();

// Define a route for signing up
router.post(
  `${apiRoutes.v1Auth}/signup`,
  // Add validation middleware to validate request body
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
  // Validate the request
  validateRequest,
  async (req: Request, res: Response) => {
    // Extract data from request body
    const { email, password, username, full_name } = req.body;

    // Check if all required parameters are provided
    if (!email || !password || !username || !full_name) {
      // Throw an error if any parameter is missing
      throw new BadRequestError("missing parameters");
    }
    // Hash the password
    const hashed_password = await Password.toHash(password);

    try {
      // Create the new user
      const newUser = (await createUser(
        email,
        hashed_password,
        username,
        full_name
      )) as dbUser;
      const account = await createAccount({
        owner_id: newUser.id,
        currency: currency.USD,
      });
      console.log(account);
      // Return the user as a response
      res.status(201).send(convertToUserResponse(newUser));
    } catch (err) {
      // If there is an error creating the user, throw an error with a friendly message
      throw new BadRequestError(
        "Sorry, we're having trouble creating your account right now. Please try again later."
      );
    }
  }
);

// Export the router
export { router as v1SignupRouter };
