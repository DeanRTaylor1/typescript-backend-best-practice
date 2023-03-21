"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("@src/util/random");
const user_1 = require("../user");
it("should create a user successfully with the correct parameters", () => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, random_1.generateUser)();
    const pgUser = yield (0, user_1.createUser)(user);
    expect(pgUser.email).toEqual(user.email);
    expect(pgUser.full_name).toEqual(user.full_name);
    expect(pgUser.hashed_password).toEqual(user.hashed_password);
    expect(pgUser.username).toEqual(user.username);
}));
it("should return a user with the correct paramaters if the user exists", () => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, random_1.generateUser)();
    const pgUser = yield (0, user_1.createUser)(user);
    expect(pgUser.email).toEqual(user.email);
    expect(pgUser.full_name).toEqual(user.full_name);
    expect(pgUser.hashed_password).toEqual(user.hashed_password);
    expect(pgUser.username).toEqual(user.username);
    const existingUser = yield (0, user_1.getUser)(pgUser.email);
    expect(existingUser.email).toEqual(user.email);
    expect(existingUser.full_name).toEqual(user.full_name);
    expect(existingUser.hashed_password).toEqual(user.hashed_password);
    expect(existingUser.username).toEqual(user.username);
}));
