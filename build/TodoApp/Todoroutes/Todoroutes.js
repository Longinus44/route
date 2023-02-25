"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TodoController_1 = require("../TodoController/TodoController");
const TodoAuth_1 = require("../TodoMiddlewares/TodoAuth");
const router = express_1.default.Router();
router.get("/", TodoAuth_1.auth, TodoController_1.TodoController.getAllTodo);
router.get("/by-id/:id", TodoAuth_1.auth, TodoController_1.TodoController.getTodoById);
router.post("/create", TodoAuth_1.auth, TodoController_1.TodoController.createTodo);
router.patch("/:id", TodoAuth_1.auth, TodoController_1.TodoController.updateTodo);
router.delete("/by-id/:id", TodoAuth_1.auth, TodoController_1.TodoController.deleteTodo);
exports.default = router;
