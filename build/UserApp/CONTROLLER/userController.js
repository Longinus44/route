"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usercontroller = void 0;
const userModel_1 = require("../MODEL/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const multer_1 = __importStar(require("multer"));
const path_1 = __importDefault(require("path"));
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
        var _a, _b;
        const storage = (0, multer_1.diskStorage)({
            destination: "./uploads/images",
            filename: (req, file, cb) => {
                cb(null, `${file.fieldname}${new Date()}${path_1.default.extname(file.originalname)}`);
            },
        });
        const upload = (0, multer_1.default)({
            storage: storage,
            limits: {
                fileSize: 1024 * 1024 * 5,
            },
        });
        const { firstname, lastname, othername, email, password, state_of_origin, date_of_birth, phone, } = req.body;
        try {
            const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const existuser = await userModel_1.userModel.findOne({ email: email, phone: phone });
            if (existuser) {
                return res.status(409).send("email / phone already exist");
            }
            upload.single("images");
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
                image: {
                    data: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename,
                    contentType: "image/jpeg",
                    url: `http://localhost:7070/upload/image/${file}`,
                },
                created: new Date(),
            });
            await user.save();
            return res.status(201).send({ message: "user created", users: user });
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
    static async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await userModel_1.userModel.findOne({ email: email });
            if (!user) {
                return res.status(404).send("no user found");
            }
            const ismatch = bcrypt_1.default.compareSync(password, user.password);
            if (!ismatch) {
                return res.status(401).send("wrong Auth");
            }
            return res.send("login successful");
        }
        catch (err) {
            console.log(err);
        }
    }
    static async deleteUserById(req, res) {
        const id = req.params.id;
        try {
            const user = await userModel_1.userModel.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).send("user not found");
            }
            return res.send(`${user.firstname} has been deleted`);
        }
        catch (err) {
            console.log(err);
        }
    }
    static async deleteUserByEmail(req, res) {
        const email = req.params.email;
        try {
            const user = await userModel_1.userModel.findOneAndRemove({ email: email });
            if (!user) {
                return res.status(404).send("user not found");
            }
            return res.send(`${user.email} has been deleted`);
        }
        catch (err) {
            console.log(err);
        }
    }
    static async updateUser(req, res) {
        const id = req.params.id;
        const { firstname, lastname } = req.body;
        try {
            const user = await userModel_1.userModel.findByIdAndUpdate({ _id: id }, { $set: { firstname, lastname } }, { new: true });
            return res.send({ user: user, updatedAt: new Date() });
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.Usercontroller = Usercontroller;
