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
exports.getUser = exports.createUser = void 0;
const pool_1 = __importDefault(require("../pool"));
function createUser(arg) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield pool_1.default.query(`INSERT INTO users (email, hashed_password, username, full_name) VALUES ($1, $2, $3, $4) RETURNING *`, [arg.email, arg.hashed_password, arg.username, arg.full_name]);
            if (!response) {
                throw new Error("User not created");
            }
            const { rows } = response;
            return rows[0];
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.createUser = createUser;
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield pool_1.default.query(`SELECT * FROM users WHERE email = $1`, [
            email,
        ]);
        if (!response) {
            throw new Error("User not found");
        }
        const { rows } = response;
        return rows[0];
    });
}
exports.getUser = getUser;
