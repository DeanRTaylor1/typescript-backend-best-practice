import { CustomError } from "./custom-error";

export class ServerSideError extends CustomError {
  statusCode = 500;
  reason = "Unable to perform operation. Please try again later.";
  constructor(message?: string) {
    super("Unable to perform operation. Please try again later.");
    if (!!message) {
      this.reason = message;
    }
    Object.setPrototypeOf(this, ServerSideError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
