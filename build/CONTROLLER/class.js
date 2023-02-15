"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usercontroller = void 0;
const userModel_1 = require("../MODEL/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const logincontroller_1 = __importDefault(require("./logincontroller"));
const deletecontroller_1 = __importDefault(require("./deletecontroller"));
const patchcontroller_1 = __importDefault(require("./patchcontroller"));
class Usercontroller {
    static async getAlluser(req, res) {
        try {
            const user = userModel_1.userModel.find().select("firstname lastname othername email password date_of_birth state_of_origin");
            const result = await user;
            if (result) {
                return res.send(result);
            }
            return res.status(404).send("No user found");
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
    static async getUserById(req, res) {
        const id = req.params.id;
        try {
            const user = await userModel_1.userModel.findById(id);
            if (!user) {
                return res.status(404).send("user not found");
            }
            return res.send(user);
        }
        catch (err) {
            console.log(err);
        }
    }
    static async getUserByEmail(req, res) {
        const email = req.params.email;
        try {
            const user = await userModel_1.userModel.findOne({ email: email });
            if (!user) {
                return res.status(404).send("no user found");
            }
            return res.send(user);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
    static async registerUser(req, res) {
        const { firstname, lastname, othername, email, password, state_of_origin, date_of_birth, phone, } = req.body;
        try {
            const existuser = await userModel_1.userModel.findOne({ email: email, phone: phone });
            if (existuser) {
                return res.status(409).send("email / phone already exist");
            }
            const hash = bcrypt_1.default.hashSync(password, 10);
            const user = new userModel_1.userModel({
                firstname,
                lastname,
                othername,
                email,
                password: hash,
                state_of_origin,
                date_of_birth,
                phone,
                createdAt: new Date(),
            });
            await user.save();
            return res.status(201).send({ message: "user created", users: user });
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
    static loginUser(req, res) {
        logincontroller_1.default.loginUser(req, res);
    }
    static deleteUserById(req, res) {
        return deletecontroller_1.default.deleteUserById(req, res);
    }
    static deleteUserByEmail(req, res) {
        return deletecontroller_1.default.deletebyEmail(req, res);
    }
    static updateUser(req, res) {
        return patchcontroller_1.default.updateUser(req, res);
    }
}
exports.Usercontroller = Usercontroller;
