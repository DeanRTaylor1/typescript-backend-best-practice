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
exports.v1SignupRouter = void 0;
const validate_request_1 = require("@src/middleware/validate-request");
const api_routes_1 = require("@src/types/api-routes");
const express_validator_1 = require("express-validator");
const express_1 = __importDefault(require("express"));
const errors_1 = require("@src/errors");
const user_1 = require("@src/db/sql/user");
const user_response_1 = require("@src/types/user-response");
const router = express_1.default.Router();
exports.v1SignupRouter = router;
router.post(`${api_routes_1.apiRoutes.v1Auth}/signup`, [
    (0, express_validator_1.body)("email")
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("Email must be valid")
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
    (0, express_validator_1.body)("username")
        .trim()
        .not()
        .isEmpty()
        .escape()
        .isLength({ min: 4, max: 20 })
        .withMessage("Username must be between 4 and 20 characters"),
    (0, express_validator_1.body)("full_name").not().isEmpty().escape(),
], validate_request_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, full_name } = req.body;
    if (!email || !password || !username || !full_name) {
        throw new errors_1.BadRequestError("missing paramaters");
    }
    let newUser = {
        email,
        hashed_password: password,
        username,
        full_name,
    };
    try {
        newUser = yield (0, user_1.createUser)(newUser);
        res.status(201).send((0, user_response_1.convertToUserResponse)(newUser));
    }
    catch (err) {
        throw new errors_1.BadRequestError("Error creating user.");
    }
}));
