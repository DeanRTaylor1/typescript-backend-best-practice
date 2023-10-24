import { HttpError } from "routing-controllers";

export class HttpException<T> extends HttpError {
  public status: number;
  public data?: T;

  constructor(status: number, message: string, data?: T) {
    super(status);
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
