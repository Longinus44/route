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
exports.registerUser = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../MODEL/userModel");
const multer_1 = __importStar(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = (0, multer_1.diskStorage)({
    destination: "../upload/images",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname} ${new Date()} ${path_1.default.extname(file.originalname)}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
const registerUser = (req, res) => {
    const { email, phone, firstname, lastname, othername, date_of_birth, state_of_origin, } = req.body;
    userModel_1.userModel.find({ email, phone }).then((user) => {
        var _a;
        if (user.length > 0) {
            res.status(409).send("email/number already exists");
        }
        else {
            upload.single("image");
            const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            bcrypt_1.default.hash(req.body.password, 5, (err, hash) => {
                var _a;
                if (err) {
                    console.log(err.message);
                }
                else {
                    const user = new userModel_1.userModel({
                        firstname,
                        lastname,
                        othername,
                        email,
                        password: hash,
                        date_of_birth,
                        state_of_origin,
                        phone,
                        image: {
                            data: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
                            contentType: "image/jpeg",
                            url: `http://localhost:7070/upload/image/${file}`,
                        },
                    });
                    user
                        .save()
                        .then((user) => {
                        const response = {
                            user: { user },
                        };
                        res.send(response);
                    })
                        .catch((err) => {
                        res.status(400).send(err.message);
                    });
                }
            });
        }
    });
};
exports.registerUser = registerUser;
exports.default = {
    router,
    registerUser: exports.registerUser,
};
