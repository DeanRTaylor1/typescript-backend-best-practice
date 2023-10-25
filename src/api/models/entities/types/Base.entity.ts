import { SnakeCaseObj } from "@lib/validation/types";

abstract class BaseEntity<T> {
  abstract toSnake(): SnakeCaseObj<T>;
}

export default BaseEntity;
