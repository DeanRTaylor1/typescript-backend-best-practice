import express, { IRouterMatcher } from "express";
import path from "path";
import { Container } from "typedi";
import * as dotenv from "dotenv";
import { useContainer } from "class-validator";
import { useExpressServer } from "routing-controllers";

class App {
  private app: express.Application = express();
  public env: NodeJS.ProcessEnv | string | number;
  public port: string | number;

  constructor() {
    //TODO Update env
    this.env = process.env || "development";
    this.port = process.env.port || 3001;
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
  }

  private initRoutes() {
    useContainer(Container);
    useExpressServer(this.app, {
      defaultErrorHandler: false,
      routePrefix: `api/v1`,
      middlewares: [path.join(__dirname, "/api/middleware/*")],
      controllers: [path.join(__dirname, "/api/controllers/*")],
    });
  }

  private registerHealthCheck() {
    this.app.get("/", (req: any, res: any) => {
      res.json({ status: 200, message: "ok" });
    });
  }
}

export { App };
