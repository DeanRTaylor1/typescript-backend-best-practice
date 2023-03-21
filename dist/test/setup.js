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
const pool_1 = __importDefault(require("@src/db/pool"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // TODO - add database connection and env variable setup
    try {
        pool_1.default.connect({
            host: "localhost",
            port: 5432,
            database: "typescript-backend-best-practice",
            user: "root",
            password: "secret",
        });
        console.log("connected to test pg");
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield pool_1.default.close();
}));
