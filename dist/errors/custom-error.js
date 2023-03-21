"use strict";
//abstract customerror class
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
/*
 When you extend a built-in class in TypeScript, the prototype chain is broken.
 By calling Object.setPrototypeOf(this, CustomError.prototype) in the constructor of your abstract class,
 you are linking the prototype chain to the new class.
*/
class CustomError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
