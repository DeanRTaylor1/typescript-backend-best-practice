/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Response, Request } from "express";
//This is a hack to get async/await to work with express and stop the app from crashing
import "express-async-errors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { NotFoundError } from "./errors";
import { errorHandler } from "./middleware/error-handler";
import { formatMethod, formatStatus } from "./util/";
import { v1SignupRouter } from "./v1/routes/auth/signup";
import { v1LoginRouter } from "./v1/routes/auth/login";
import { currentUser } from "./middleware/current-user";
import { requireAuth } from "./middleware/require-authentication";
import { v1AccountRouter } from "./v1/routes/account";
import { v1RefreshAccessTokenRouter } from "./v1/routes/auth/renew-access-token";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Create Express server
const app = express();

//set basic security headers
app.use(helmet());
//parse json request body
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  //set morgan logger format colors
  morgan.token("colored-status", (req: Request, res: Response) =>
    formatStatus(res.statusCode)
  );

  morgan.token("colored-method", (req: Request, res: Response) =>
    formatMethod(req.method)
  );
  morgan.token("end", () => formatMethod(""));

  //set morgan logger
  app.use(
    morgan(
      `[Express] :date[iso] | :colored-status | :response-time ms | :remote-addr | :colored-method ":url" :end`,
      {
        stream: process.stdout,
      }
    )
  );
}

app.use(v1SignupRouter);
app.use(v1LoginRouter);

//All routes below this line require authentication

app.use(currentUser);
app.use(requireAuth);

/* ---------------------------------- */
app.use(v1AccountRouter);
app.use(v1RefreshAccessTokenRouter);
//not found 404
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

//error handler
app.use(errorHandler);

export { app };
