import { logger } from "@lib/debug/logger";
import { StatusCodeEnum } from "api/enum/api.enum";
import { HttpException } from "api/errors/HttpException";

export function HandleErrors<T>(
  target: T,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  if (!originalMethod) {
    throw new Error("Expected method not found on descriptor");
  }

  descriptor.value = async function (...args: unknown[]) {
    try {
      return await originalMethod.apply(this as T, args);
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        logger.error(error);
        throw new HttpException(
          StatusCodeEnum.INTERNAL_SERVER_ERROR,
          "Something went wrong."
        );
      }
    }
  };
}
