import express, { Request, Response } from "express";
import { getAccount } from "../../../db/sql";
import { apiRoutes } from "../../../types/api-routes";

const router = express.Router();

router.get(`${apiRoutes.v1Account}`, async (req: Request, res: Response) => {
  const currentUser = req.currentUser;

  const dbAccount = await getAccount(currentUser!.id);
  console.log(dbAccount);
  res.send({ account: dbAccount });
});

export { router as v1AccountRouter };
