import { API_RES, StatusCodeEnum } from "api/enum/api.enum";
import { ApiResponse } from "api/types/response.interface";
import { HttpError } from "routing-controllers";
import { Response } from "express";

export class BaseController {
  protected code: StatusCodeEnum = StatusCodeEnum.OK;
  protected data: unknown;
  protected message: string = "Success.";
  protected typeRes: API_RES = API_RES.JSON;
  protected exception: HttpError;

  public setCode(code: StatusCodeEnum): this {
    this.code = code;
    return this;
  }

  public setData<T>(data: T): this {
    this.data = data;
    return this;
  }

  public setMessage(message: string): this {
    this.message = message;
    return this;
  }

  protected getResponse<T>(res: Response, status: boolean): Response {
    const result: ApiResponse<T> = {
      status: status ? true : false,
      code: this.code,
      data: this.data as T,
      message: this.message,
    };

    if (this.typeRes === API_RES.JSON) {
      return res.status(this.code).json(result);
    }

    if (this.typeRes === API_RES.SEND) {
      return res.status(this.code).send(result);
    }

    // Default to JSON response if type is not recognized
    return res.status(this.code).json(result);
  }

  public responseSuccess<T>(data: T, message: string, res: Response): Response {
    this.setCode(StatusCodeEnum.OK);
    this.setData(data);
    this.setMessage(message);
    return this.getResponse(res, true);
  }

  public responseErrors(
    res: Response,
    message: string = "An error occurred",
    statusCode: StatusCodeEnum = StatusCodeEnum.INTERNAL_SERVER_ERROR
  ): Response {
    this.setCode(statusCode);
    this.setData(null);
    this.setMessage(message);
    return this.getResponse<null>(res, false);
  }
}
