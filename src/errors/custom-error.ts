//abstract customerror class

/* 
 When you extend a built-in class in TypeScript, the prototype chain is broken. 
 By calling Object.setPrototypeOf(this, CustomError.prototype) in the constructor of your abstract class, 
 you are linking the prototype chain to the new class.
*/

export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
