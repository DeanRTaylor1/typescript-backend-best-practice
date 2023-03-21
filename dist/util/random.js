"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateString = exports.generateUser = exports.generateEmail = void 0;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
function generateEmail() {
    let email = "";
    for (let i = 0; i < 6; i++) {
        email += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return `${email}@gmail.com`;
}
exports.generateEmail = generateEmail;
function generateString() {
    let user = "";
    for (let i = 0; i < 9; i++) {
        user += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return `${user}`;
}
exports.generateString = generateString;
function generateUser() {
    const user = {
        email: generateEmail(),
        hashed_password: "test",
        username: generateString(),
        full_name: generateString(),
    };
    return user;
}
exports.generateUser = generateUser;
