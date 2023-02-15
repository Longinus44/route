"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../TodoController/userController");
const bodyAuth_1 = require("../TodoMiddlewares/bodyAuth");
const signupValidator_1 = require("../TodoMiddlewares/signupValidator");
const TodoAuth_1 = require("../TodoMiddlewares/TodoAuth");
const router = (0, express_1.default)();
router.get("/", userController_1.userController.getAllUser);
router.get("/by-id/:id", TodoAuth_1.auth, userController_1.userController.getUserById);
router.post("/signup", bodyAuth_1.bodyAuth, signupValidator_1.validatesignup, userController_1.userController.createUser);
router.post("/login", bodyAuth_1.bodyAuth, signupValidator_1.validatesignup, userController_1.userController.loginUser);
//  router.patch("/:id");
router.delete("/by-id/:id", userController_1.userController.removeUser);
exports.default = router;
