"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMethod = exports.formatStatus = void 0;
const cli_color_1 = __importDefault(require("cli-color"));
const formatStatus = (status) => {
    switch (true) {
        case status >= 500:
            return cli_color_1.default.bgRed(` ${status} `);
        case status >= 400:
            return cli_color_1.default.bgYellow(` ${status} `);
        case status >= 300:
            return cli_color_1.default.bgCyan(` ${status} `);
        case status >= 200:
            return cli_color_1.default.bgGreen(` ${status} `);
        default:
            return cli_color_1.default.bgBlack();
    }
};
exports.formatStatus = formatStatus;
const formatMethod = (method) => {
    switch (method) {
        case "GET":
            return cli_color_1.default.bgBlueBright(` ${method}      =>`);
        case "POST":
            return cli_color_1.default.bgCyan(` ${method}     =>`);
        case "PUT":
            return cli_color_1.default.bgYellow(` ${method}      =>`);
        case "PATCH":
            return cli_color_1.default.bgMagenta(` ${method}    =>`);
        case "DELETE":
            return cli_color_1.default.bgRed(` ${method}   =>`);
        default:
            return cli_color_1.default.bgBlack();
    }
};
exports.formatMethod = formatMethod;
