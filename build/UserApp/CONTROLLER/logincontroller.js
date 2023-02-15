"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const config_1 = require("../CONFIG/config");
const userModel_1 = require("../MODEL/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registercontroller_1 = __importDefault(require("./registercontroller"));
const loginUser = (req, res) => {
    userModel_1.userModel.find({ email: req.body.email }).then((user) => {
        if (user) {
            bcrypt_1.default.compare(req.body.password, user[0].password, (err, data) => {
                if (err) {
                    console.log("Authentication failed");
                }
                if (data) {
                    const token = jsonwebtoken_1.default.sign({
                        email: user[0].email,
                        // userid: user[0]._id,
                    }, config_1.config.secretkey, { expiresIn: "1hr" });
                    res.send(token);
                }
                else {
                    res.status(401).send("Auth failed");
                }
            });
        }
    });
};
exports.loginUser = loginUser;
exports.default = {
    router: registercontroller_1.default,
    loginUser: exports.loginUser,
};
