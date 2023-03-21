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
const app_1 = require("./app");
const util_1 = require("./util");
const pool_1 = __importDefault(require("./db/pool"));
const PORT = process.env.PORT || 8080;
// start the Express server and do initial setup here
// TODO - add database connection and env variable setup
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.PG_HOST ||
        !process.env.PG_USERNAME ||
        !process.env.PG_PASSWORD) {
        console.log(util_1.colors.FgRed, "Missing environment variables! Please check your .env file.");
        console.log(util_1.colors.Reset, "");
        process.exit(1);
    }
    try {
        console.log(util_1.colors.FgCyan, "initializing api...");
        pool_1.default.connect({
            host: process.env.PG_HOST,
            port: 5432,
            database: "typescript-backend-best-practice",
            user: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
        });
        console.log(util_1.colors.FgGreen, "Connected to pg...");
    }
    catch (err) {
        console.log(util_1.colors.FgRed, "Error connecting to database");
        console.log(util_1.colors.Reset, "");
        process.exit(1);
    }
    app_1.app.listen(PORT, () => {
        console.log(util_1.colors.FgCyan, `Listening on port ${PORT}`);
        console.log(util_1.colors.Reset, "");
    });
}))();
