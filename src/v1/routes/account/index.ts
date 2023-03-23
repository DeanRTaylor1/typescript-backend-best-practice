import express, { Request, Response } from "express";
import { getAccount } from "../../../db/sql";
import { NotAuthorizedError } from "../../../errors";
import { apiRoutes } from "../../../types/api-routes";

const router = express.Router();

router.get(`${apiRoutes.v1Account}`, async (req: Request, res: Response) => {
  const currentUser = req.currentUser;
  if (!currentUser) {
    throw new NotAuthorizedError();
  }
  const dbAccount = await getAccount(currentUser.id);

  res.send({ account: dbAccount });
});

export { router as v1AccountRouter };
