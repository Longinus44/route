"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const config_1 = require("./UserApp/CONFIG/config");
const express_1 = __importDefault(require("express"));
const database_1 = require("./UserApp/Database/database");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("./UserApp/ROUTE/user"));
const app = (0, express_1.default)();
const port = config_1.config.port;
database_1.dataBase.connect(config_1.config.dataBase.Name, config_1.config.dataBase.Password);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/user", user_1.default);
app.listen(port, () => {
    console.log(`application is live on ${config_1.config.host}${config_1.config.port}`);
});
