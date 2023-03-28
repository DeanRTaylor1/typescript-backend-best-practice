/**
 * @api {post} /v1/auth/renew Renew Access Token
 * @apiName RenewAccessToken
 * @apiGroup Authentication
 *
 * @apiParam {String} refresh_token User's refresh token.
 *
 * @apiSuccess {Object} data Object containing access token and expiry time.
 * @apiSuccess {String} data.access_token User's new access token.
 * @apiSuccess {String} data.access_token_expires_at Expiry time of the access token in local time.
 *
 * @apiError (401 Unauthorized) NotAuthorizedError User is not authorized to access this route.
 */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";

import express from "express";
import { apiRoutes } from "../../../types/api-routes";
import { NotAuthorizedError } from "../../../errors";
import { createToken, verifyToken } from "../../../util";
import { dbSession } from "../../../db/models/sessions";
import { getSession } from "../../../db/sql/session.sql";

const router = express.Router();

router.post(
  `${apiRoutes.v1Auth}/renew`,
  async (req: Request, res: Response) => {
    try {
      // Get refresh token from request body

      const refresh_token = req.body.refresh_token;
      // Verify refresh token

      const payload = await verifyToken(refresh_token);

      const session: dbSession = await getSession(payload.id);

      if (session.is_blocked) {
        throw new Error("User's session is blocked");
      }

      if (req.currentUser!.email !== session.email) {
        throw new Error("Mismatched email fields");
      }

      if (session.refresh_token !== refresh_token) {
        throw new Error("Mismatched refresh tokens");
      }

      const { token: access_token, payload: access_token_payload } =
        await createToken(
          req.currentUser!.user_id,
          req.currentUser!.username,
          req.currentUser!.email,
          +process.env.ACCESS_TOKEN_DURATION!
        );

      res.status(200).send({
        access_token,
        access_token_expires_at: new Date(
          access_token_payload.expires_at
        ).toLocaleString(),
      });
    } catch (error) {
      throw new NotAuthorizedError();
    }
  }
);

export { router as v1RefreshAccessTokenRouter };
