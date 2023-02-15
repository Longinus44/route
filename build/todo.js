"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const TodoConfig_1 = require("./TodoApp/Todoconfig/TodoConfig");
const express_1 = __importDefault(require("express"));
const TodoDatabase_1 = require("./TodoApp/TodoDatabase/TodoDatabase");
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./TodoApp/Todoroutes/userRoutes"));
const Todoroutes_1 = __importDefault(require("./TodoApp/Todoroutes/Todoroutes"));
const app = (0, express_1.default)();
const port = TodoConfig_1.Tconfig.Port;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/user", userRoutes_1.default);
app.use("/user/todo", Todoroutes_1.default);
TodoDatabase_1.Database.connect(TodoConfig_1.Tconfig.Database.DB_Name, TodoConfig_1.Tconfig.Database.DB_Code);
app.get("/", (req, res) => {
    res.send("app is ready");
});
app.listen(port, () => {
    console.log(`Application is live on ${TodoConfig_1.Tconfig.Host}${TodoConfig_1.Tconfig.Port}`);
});
