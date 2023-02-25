"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
require("dotenv").config("../.env");
exports.dbConfig = {
    jwtkey: String(process.env.JWTKEY),
    client: String(process.env.client),
    user: String(process.env.user),
    password: String(process.env.sql_password),
    database: String(process.env.sql_database),
};
