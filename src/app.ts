import path from "path";

import { env } from "@env";
import { morganStream } from "@lib/debug/logger";

import express, { Request, Response } from "express";
import { Container } from "typedi";
import { useContainer } from "class-validator";
import { useExpressServer } from "routing-controllers";
import morgan from "morgan";

class App {
  private app: express.Application = express();
  public env: NodeJS.ProcessEnv | string | number;
  public port: string | number;

  constructor() {
    //TODO Update env
    this.env = env.nodeEnv || "development";
    this.port = env.core.port || 3000;
    this.registerMiddleware();
    this.registerHealthCheck();
    this.initRoutes();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App ready and listening on port: ${this.port}.`);
    });
  }

  public getApp() {
    return this.app;
  }

  public registerMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, "/public")));
    this.app.use(
      morgan(
        "[Express] :colored-status | :response-time ms | :remote-addr | :colored-method ':url' :end",
        { stream: morganStream }
      )
    );
  }

  private initRoutes() {
    useContainer(Container);
    useExpressServer(this.app, {
      defaultErrorHandler: false,
      routePrefix: "api/v1",
      middlewares: [path.join(__dirname, "/api/middleware/*")],
      controllers: [path.join(__dirname, "/api/controllers/*")],
    });
  }

  private registerHealthCheck() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ status: 200, message: "ok" });
    });
  }
}

export { App };
