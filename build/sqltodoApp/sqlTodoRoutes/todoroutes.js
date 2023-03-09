"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../Controllers/todoController");
const todoValidator_1 = require("../middleWares/todoValidator");
const signupValidator_1 = require("../middleWares/signupValidator");
const userAuth_1 = require("../Auth/userAuth");
const userToken_1 = require("../Auth/userToken");
const router = express_1.default.Router();
router.get("/usertodo/:id", 
// authorisedUser,
// check_token,
todoController_1.todoController.getUserTodo);
router.get("/", userAuth_1.authorisedUser, userToken_1.check_token, todoController_1.todoController.getAllTodo);
router.get("/by-id/:id", 
// authorisedUser,
// check_token,
todoController_1.todoController.getTodoById);
router.post("/create", userAuth_1.authorisedUser, userToken_1.check_token, todoValidator_1.todoValidator, signupValidator_1.validate, todoController_1.todoController.createTodo);
router.patch("/:id", userAuth_1.authorisedUser, userToken_1.check_token, todoController_1.todoController.updateTodo);
router.delete("/:id", userAuth_1.authorisedUser, userToken_1.check_token, todoController_1.todoController.deleteTodo);
exports.default = router;
