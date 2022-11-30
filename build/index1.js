"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const product_1 = __importDefault(require("./Routes/product"));
const order_1 = __importDefault(require("./Routes/order"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./Routes/user"));
const indexconfig_1 = require("./Config/indexconfig");
const DataB_1 = require("./DataB");
DataB_1.Database.connect(indexconfig_1.indexconfig.database2.name, indexconfig_1.indexconfig.database2.password);
const app = (0, express_1.default)();
const port = 5446;
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/product", product_1.default);
app.use("/order", order_1.default);
app.use("/user", user_1.default);
app.get("/", (req, res) => {
    res.send("get madey");
});
app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`);
});
