"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToUserResponse = void 0;
const convertToUserResponse = (user) => {
    const res = {
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at,
    };
    return res;
};
exports.convertToUserResponse = convertToUserResponse;
