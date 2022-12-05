"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const config_1 = require("../serverConfig/config");
// import { token } from "morgan";
const jwt = require("jsonwebtoken");
module.exports = (req, res, Next) => {
    // const code = "secretAccessKey"
    const ver = req.body.token;
    console.log(req);
    //   console.log(token);
    try {
        const decode = jwt.verify(ver, config_1.sConfig.JWTKEY);
        req = decode;
        Next();
    }
    catch (err) {
        console.log(err);
    }
};
