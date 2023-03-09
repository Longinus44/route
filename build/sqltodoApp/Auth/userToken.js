"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_token = void 0;
const sqlConfig_1 = require("../sqlConfig/sqlConfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const check_token = (req, res, next) => {
    const secretKey = sqlConfig_1.dbconfig.jwtkey;
    try {
        const token = req.header("Auth-token");
        if (!token) {
            return res.send("access denied");
        }
        else {
            const user = jsonwebtoken_1.default.verify(token, secretKey);
            if (user) {
                //console.log(user);
                req["user_id"] = user["user_id"];
                next();
            }
        }
    }
    catch (err) {
        return res.send(err.message);
    }
};
exports.check_token = check_token;
