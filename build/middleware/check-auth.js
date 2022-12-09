"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const check_auth = (req, res, next) => {
    const secretKey = "secretAccessKey";
    const hash = jsonwebtoken_1.default.sign("chijioke", secretKey);
    console.log(hash);
    let decode = jsonwebtoken_1.default.verify(hash, secretKey);
    console.log(decode);
    next();
};
exports.check_auth = check_auth;
