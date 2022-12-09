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
// import userroute from "./serverroute/user2";
const user3_1 = __importDefault(require("./serverroute/user3"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = config_1.sConfig.port;
sdatabase_1.sdatabase.connect(config_1.sConfig.DB.name, config_1.sConfig.DB.password);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/product", product2_1.default);
app.use("/order", order2_1.default);
// app.use("/user", userroute);
app.use("/user", user3_1.default);
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
});
app.use("/upload", express_1.default.static("upload/images"));
app.get("/", (req, res) => {
    res.send("get made ready");
});
app.post("/upload", upload.single("profile"), (req, res) => {
    var _a;
    res.send({
        success: true,
        image: `http://localhost:6000/profile/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`,
        message: "profile uploaded",
    });
    console.log(req.file);
});
function errHandler(err, req, res) {
    if (err instanceof multer_1.default.MulterError) {
        console.log(err);
        res.status(400).send({
            success: false,
            message: err.message,
        });
    }
}
app.use(errHandler);
app.listen(port, () => {
    console.log(`app is running on ${config_1.sConfig.host}:${config_1.sConfig.port}`);
});
