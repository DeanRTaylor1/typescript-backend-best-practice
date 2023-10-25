import { API_RES, StatusCodeEnum } from "api/enum/api.enum";
import { ApiResponse } from "api/types/response.interface";
import { Response } from "express";
import BaseEntity from "api/models/entities/types/Base.entity";
import { env } from "@env";

export class BaseController {
  protected code: StatusCodeEnum = StatusCodeEnum.OK;
  protected data: unknown;
  protected message: string = "Success";
  protected typeRes: API_RES = API_RES.JSON;
  protected enableSnakeCase: boolean = env.config.enableSnakeCase;

  public setCode(code: StatusCodeEnum): this {
    this.code = code;
    return this;
  }

  public setData<T>(data: T | BaseEntity<T>[]): this {
    this.data = this.transformData(data);
    return this;
  }

  public setMessage(message: string): this {
    this.message = message;
    return this;
  }

  public setTypeRes(type: API_RES): this {
    this.typeRes = type;
    return this;
  }

  protected getResponse<T>(res: Response, status: boolean): Response {
    const result: ApiResponse<T> = {
      status,
      code: this.code,
      data: this.data as T,
      message: this.message,
    };

    switch (this.typeRes) {
      case API_RES.JSON:
        return res.status(this.code).json(result);
      case API_RES.SEND:
        return res.status(this.code).send(result);
      default:
        throw new Error(`Unsupported response type: ${this.typeRes}`);
    }
  }

  public responseSuccess<T>(data: T, message: string, res: Response): Response {
    return this.setCode(StatusCodeEnum.OK)
      .setData(data)
      .setMessage(message)
      .getResponse<T>(res, true);
  }

  public responseError(
    res: Response,
    message: string = "An error occurred",
    statusCode: StatusCodeEnum = StatusCodeEnum.INTERNAL_SERVER_ERROR
  ): Response {
    return this.setCode(statusCode)
      .setData(null)
      .setMessage(message)
      .getResponse<null>(res, false);
  }

  private transformData<T>(data: T | BaseEntity<T>[]): unknown {
    if (!this.enableSnakeCase) return data;

    if (Array.isArray(data)) {
      return data.map((item) =>
        this.isBaseEntity(item) ? item.toSnake() : item
      );
    }

    return this.isBaseEntity(data) ? data.toSnake() : data;
  }

  private isBaseEntity<T>(object: unknown): object is BaseEntity<T> {
    return (object as BaseEntity<T>)?.toSnake !== undefined;
  }
}
