"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const TodoConfig_1 = require("../Todoconfig/TodoConfig");
const userModel_1 = require("../TodoModel/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class userController {
}
exports.userController = userController;
_a = userController;
userController.getAllUser = async (req, res) => {
    try {
        const users = await userModel_1.userModel.find().select("id username Todo");
        if (users) {
            return res.send(users);
        }
        return res.status(404).send("no user found");
    }
    catch (err) {
        console.log(err);
    }
};
userController.getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel_1.userModel.findById(id).select("id username Todo");
        if (user) {
            return res.send(user);
        }
        return res.status(404).send("no user found");
    }
    catch (err) {
        console.log(err);
    }
};
userController.createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existUser = await userModel_1.userModel.findOne({ username: username });
        if (existUser) {
            return res.status(409).send("user already exist");
        }
        const hash = bcrypt_1.default.hashSync(password, 2);
        const newUser = new userModel_1.userModel({
            username,
            password: hash,
        });
        newUser.save();
        return res.status(201).send("new User created successfully");
    }
    catch (err) {
        console.log(err);
    }
};
userController.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel_1.userModel.findOne({ username: username });
        if (!user) {
            return res.status(404).send("user doesn't exist");
        }
        const match = bcrypt_1.default.compareSync(password, user.password);
        if (!match) {
            return res.status(400).send("Auth failed ");
        }
        const token = jsonwebtoken_1.default.sign({ user: match }, TodoConfig_1.Tconfig.JWTCODE, {
            expiresIn: "5000s",
        });
        return res.send({ msg: "login successful", token: token });
    }
    catch (err) {
        console.log(err);
    }
};
userController.removeUser = async (req, res) => {
    const id = req.params.id;
    try {
        const userexist = await userModel_1.userModel.findByIdAndDelete(id);
        if (!userexist) {
            return res.sendStatus(404);
        }
        return res.send("user deleted");
    }
    catch (err) {
        console.log(err);
    }
};
