"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const UserModel_1 = require("../sqlModel/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sqlConfig_1 = require("../sqlConfig/sqlConfig");
class userController {
}
exports.userController = userController;
_a = userController;
userController.getAllUser = async (req, res) => {
    try {
        const user = await UserModel_1.UserModel.query()
            .select("id", "name", "email")
            .withGraphFetched("todo");
        if (!user.length) {
            return res.status(404).send("no user found");
        }
        else {
            return res.send(user);
        }
    }
    catch (err) {
        console.log(err);
    }
};
userController.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const userWithId = await UserModel_1.UserModel.query().findById(id);
        if (userWithId) {
            return res.send(userWithId);
        }
        return res.status(404).send("user with Id not found");
    }
    catch (err) {
        console.log(err);
    }
};
userController.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt_1.default.hashSync(password, 7);
    const newUser = {
        name: name,
        email: email,
        password: hashedPassword,
    };
    try {
        const userExist = await UserModel_1.UserModel.query().where({ email: email });
        if (!userExist.length) {
            const savedUser = await UserModel_1.UserModel.query().insert(newUser);
            return res
                .status(201)
                .send({ message: "user created", user: savedUser });
        }
        else {
            return res.status(409).send("user already exist");
        }
    }
    catch (err) {
        console.log(err);
    }
};
userController.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await UserModel_1.UserModel.query().findOne({ email: email });
        if (userExist) {
            const isMatch = bcrypt_1.default.compareSync(password, userExist.password);
            if (isMatch) {
                const token = jsonwebtoken_1.default.sign({ user_id: userExist.id }, sqlConfig_1.dbConfig.jwtkey, {
                    expiresIn: "1h",
                });
                return res.send(token);
            }
            return res.status(401).send("wrong email/passsword ");
        }
        return res.status(404).send("user doesn't exist");
    }
    catch (err) {
        console.log(err);
    }
};
userController.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const usertopatch = await UserModel_1.UserModel.query()
            .findById(id)
            .update({ name: name });
        if (usertopatch) {
            return res.status(200).send("user updated");
        }
        else {
            return res.status(404).send("user not found");
        }
    }
    catch (err) {
        console.log(err);
    }
};
userController.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel_1.UserModel.query().deleteById(id);
        if (deletedUser) {
            return res.send("user deleted");
        }
        else {
            return res.status(404).send("user with ID no found");
        }
    }
    catch (err) {
        console.log(err);
    }
};
