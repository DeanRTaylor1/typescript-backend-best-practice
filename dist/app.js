"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.app = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
//This is a hack to get async/await to work with express and stop the app from crashing
require("express-async-errors");
const dotenv = __importStar(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const errors_1 = require("./errors");
const error_handler_1 = require("./middleware/error-handler");
const util_1 = require("./util/");
const signup_1 = require("./v1/routes/auth/signup");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();
// Create Express server
const app = (0, express_1.default)();
exports.app = app;
//set basic security headers
app.use((0, helmet_1.default)());
//parse json request body
app.use(express_1.default.json());
if (process.env.NODE_ENV !== "test") {
    //set morgan logger format colors
    morgan_1.default.token("colored-status", (req, res) => (0, util_1.formatStatus)(res.statusCode));
    morgan_1.default.token("colored-method", (req, res) => (0, util_1.formatMethod)(req.method));
    morgan_1.default.token("end", () => (0, util_1.formatMethod)(""));
    //set morgan logger
    app.use((0, morgan_1.default)(`[Express] :date[iso] | :colored-status | :response-time ms | :remote-addr | :colored-method ":url" :end`, {
        stream: process.stdout,
    }));
}
app.use(signup_1.v1SignupRouter);
//not found 404
app.all("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new errors_1.NotFoundError();
}));
//error handler
app.use(error_handler_1.errorHandler);
