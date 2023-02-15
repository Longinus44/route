"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_validator_1 = require("../MIDDLEWARE/signup_validator");
const signupschema_1 = require("../MIDDLEWARE/signupschema");
const class_1 = require("../CONTROLLER/class");
const router = express_1.default.Router();
router.get("/", class_1.Usercontroller.getAlluser);
router.get("/get-by-id/:id", class_1.Usercontroller.getUserById);
router.get("/get-by-email/:email", class_1.Usercontroller.getUserByEmail);
router.post("/register", signupschema_1.bodyvalidator, signup_validator_1.signupvalidator, class_1.Usercontroller.registerUser);
router.post("/login", class_1.Usercontroller.loginUser);
router.patch("/:id", class_1.Usercontroller.updateUser);
router.delete("/by-id/:id", class_1.Usercontroller.deleteUserById);
router.delete("/by-email/:email", class_1.Usercontroller.deleteUserByEmail);
exports.default = router;
