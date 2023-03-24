import express, { Request, Response } from "express";
import { getAccount } from "../../../db/sql";
import { NotAuthorizedError } from "../../../errors";
import { apiRoutes } from "../../../types/api-routes";

const router = express.Router();

router.get(`${apiRoutes.v1Account}`, async (req: Request, res: Response) => {
  const currentUser = req.currentUser;

  //if currentuser is undefined the request will not reach here due to requireAuth middleware
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dbAccount = await getAccount(currentUser!.user_id);

  res.send({ account: dbAccount });
});

export { router as v1AccountRouter };
