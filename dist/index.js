"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const chalk_1 = __importDefault(require("chalk"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
morgan_1.default.token('colored-status', (req, res) => {
    const status = res.statusCode;
    let color;
    switch (true) {
        case status >= 500:
            color = '#FF0000';
            break;
        case status >= 400:
            color = '#FFFF00';
            break;
        case status >= 300:
            color = '#00FFFF';
            break;
        default:
            color = '#00FF00';
            break;
    }
    return chalk_1.default.bgHex(color)(status);
});
app.use((0, morgan_1.default)(`[Express] :date[iso] | :colored-status | :response-time ms | :remote-addr | :method ":url"`, {
    stream: process.stdout,
    skip: (req, res) => res.statusCode < 400,
}));
app.listen(PORT, () => {
    console.log('\x1b[34m%s\x1b[0m', `Listening on port ${PORT}`);
});
