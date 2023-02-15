"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_validator_1 = require("../MIDDLEWARE/signup_validator");
const signupschema_1 = require("../MIDDLEWARE/signupschema");
const userController_1 = require("../CONTROLLER/userController");
const router = express_1.default.Router();
router.get("/", userController_1.Usercontroller.getAlluser);
router.get("/get-by-id/:id", userController_1.Usercontroller.getUserById);
router.get("/get-by-email/:email", userController_1.Usercontroller.getUserByEmail);
router.post("/register", signupschema_1.bodyvalidator, signup_validator_1.signupvalidator, userController_1.Usercontroller.registerUser);
router.post("/login", userController_1.Usercontroller.loginUser);
router.patch("/:id", userController_1.Usercontroller.updateUser);
router.delete("/by-id/:id", userController_1.Usercontroller.deleteUserById);
router.delete("/by-email/:email", userController_1.Usercontroller.deleteUserByEmail);
exports.default = router;
