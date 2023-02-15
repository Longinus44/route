"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tconfig = void 0;
exports.Tconfig = {
    Port: process.env.port,
    Host: "http://localhost:",
    JWTCODE: process.env.JWTKEY,
    Database: {
        DB_Name: process.env.MONGONAME,
        DB_Code: process.env.DB_PASSWORD,
        DB_URI: process.env.DB_CONNECTION,
    },
};
