"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const config_1 = require("./serverConfig/config");
const sdatabase_1 = require("./sdatabase");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const product2_1 = __importDefault(require("./serverroute/product2"));
const order2_1 = __importDefault(require("./serverroute/order2"));
const app = (0, express_1.default)();
const port = config_1.sConfig.port;
sdatabase_1.sdatabase.connect(config_1.sConfig.DB.name, config_1.sConfig.DB.password);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/product", product2_1.default);
app.use("/order", order2_1.default);
app.get("/", (req, res) => {
    res.send("get made ready");
});
app.listen(port, () => {
    console.log(`app is running on ${config_1.sConfig.host}:${config_1.sConfig.port}`);
});
