import "reflect-metadata";
import path from "path";

import { env } from "@env";
import { morganStream } from "@lib/debug/logger";
import { UsersController } from "api/controllers/users.controller";
import { DB } from "api/models";

import express, { Request, Response } from "express";
import { Container } from "typedi";
import { useExpressServer, useContainer } from "routing-controllers";
import morgan from "morgan";

class App {
  private app: express.Application = express();
  public env: NodeJS.ProcessEnv | string | number;
  public port: string | number;

  constructor() {
    //TODO Update env
    this.env = env.nodeEnv || "development";
    this.port = env.core.port || 3000;

    this.connectToDatabase();
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

  private connectToDatabase() {
    DB.sequelize.authenticate();
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
      routePrefix: "/api/v1",
      middlewares: [path.join(__dirname, "/api/middleware/*")],
      controllers: [path.join(__dirname, "/api/controllers/*")],
    });

    const constructorParams = Reflect.getMetadata(
      "design:paramtypes",
      UsersController
    );
    console.log("Constructor parameter types:", constructorParams);

    const usersRepositoryMetadata = Reflect.getMetadata(
      "custom:metadata:key",
      UsersController,
      "usersRepository"
    );
    console.log("Metadata for usersRepository:", usersRepositoryMetadata);
  }

  private registerHealthCheck() {
    this.app.get("/", async (req: Request, res: Response) => {
      res.json({ status: 200, message: "ok" });
    });
  }
}

export { App };
