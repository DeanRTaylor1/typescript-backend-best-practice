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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("@src/util/random");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../../app");
it("returns a 201 on successful signup", () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
        .post("/api/v1/auth/signup")
        .send({
        email: (0, random_1.generateEmail)(),
        password: "password",
        username: (0, random_1.generateString)(),
        full_name: (0, random_1.generateString)(),
    })
        .expect(201);
}));
it("returns a 400 with invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
        .post("/api/v1/auth/signup")
        .send({
        email: (0, random_1.generateString)(),
        password: "Password123",
        username: (0, random_1.generateString)(),
        full_name: (0, random_1.generateString)(),
    })
        .expect(400);
}));
it("returns a 400 with invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
        .post("/api/v1/auth/signup")
        .send({
        email: (0, random_1.generateEmail)(),
        password: "p",
        username: "testTests",
        full_name: (0, random_1.generateString)(),
    })
        .expect(400);
}));
it("returns a 400 with missing parameters", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post("/api/v1/auth/signup")
        .send({
        email: (0, random_1.generateEmail)(),
        password: "password",
    })
        .expect(400);
    yield (0, supertest_1.default)(app_1.app)
        .post("/api/v1/auth/signup")
        .send({
        password: "p",
        full_name: (0, random_1.generateString)(),
    })
        .expect(400);
    yield (0, supertest_1.default)(app_1.app)
        .post("/api/v1/auth/signup")
        .send({
        email: random_1.generateEmail,
        full_name: (0, random_1.generateString)(),
    })
        .expect(400);
    yield (0, supertest_1.default)(app_1.app).post("/api/v1/auth/signup").send({}).expect(400);
}));
it("disallows duplicate emails", () => __awaiter(void 0, void 0, void 0, function* () {
    const email = (0, random_1.generateEmail)();
    yield (0, supertest_1.default)(app_1.app)
        .post("/api/v1/auth/signup")
        .send({
        email,
        password: "Password",
        username: (0, random_1.generateString)(),
        full_name: (0, random_1.generateString)(),
    })
        .expect(201);
    yield (0, supertest_1.default)(app_1.app)
        .post("/api/v1/auth/signup")
        .send({
        email,
        password: "Password",
        username: "testTests",
        full_name: (0, random_1.generateString)(),
    })
        .expect(400);
}));
