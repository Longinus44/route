"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sConfig = void 0;
exports.sConfig = {
    port: process.env.PORT,
    host: process.env.HOST,
    DB: {
        name: String(process.env.DB_NAME),
        password: String(process.env.DB_PASSWORD),
        DB_CONNECTION: String(process.env.DB_CONNECTION),
    },
};
