"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const appConfig_1 = require("./Config/appConfig");
const product1_1 = __importDefault(require("../SRC/approute/product1"));
const order1_1 = __importDefault(require("../SRC/approute/order1"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
database_1.DataBase.connect(appConfig_1.appConfig.database.name, appConfig_1.appConfig.database.password);
console.log(appConfig_1.appConfig.database.name + ":" + appConfig_1.appConfig.database.password);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use("/product", product1_1.default);
app.use("/order", order1_1.default);
app.get("/", (req, res) => {
    res.send("get made");
});
app.listen(appConfig_1.appConfig.port, () => {
    console.info(`Application running on ${appConfig_1.appConfig.host}:${appConfig_1.appConfig.port}`);
});
