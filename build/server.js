"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const knexfile_1 = __importDefault(require("./knexfile"));
const knex_1 = __importDefault(require("knex"));
const objection_1 = __importDefault(require("objection"));
const todoroutes_1 = __importDefault(require("./sqltodoApp/sqlTodoRoutes/todoroutes"));
const userRoutes_1 = __importDefault(require("./sqltodoApp/sqlTodoRoutes/userRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/user", userRoutes_1.default);
app.use("/todo", todoroutes_1.default);
exports.db = objection_1.default.Model.knex((0, knex_1.default)(knexfile_1.default.development));
app.listen(9000, () => {
    console.log(`application is live at http://localhost:9000`);
});
