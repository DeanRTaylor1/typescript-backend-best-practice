import { apiRoutes } from "@src/types/api-routes";
import express from "express";
const router = express.Router();

router.post(`${apiRoutes.v1Auth}/signup`, (req, res) => {
  res.status(201).send("Hello World");
});

export { router as v1SignupRouter };
