"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sConfig = void 0;
exports.sConfig = {
    port: Number(process.env.PORT),
    host: String(process.env.HOST),
    JWTKEY: String(process.env.JWTKEY),
    DB: {
        name: String(process.env.DB_NAME),
        password: String(process.env.DB_PASSWORD),
        DB_CONNECTION: String(process.env.DB_CONNECTION),
    },
};
