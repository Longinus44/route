"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../CONFIG/config");
const userModel_1 = require("../MODEL/userModel");
const router = express_1.default.Router();
const registerUser = (req, res) => {
    bcrypt_1.default.hash(req.body.password, 5, (err, hash) => {
        if (err) {
            console.log(err.message);
        }
        else {
            const user = new userModel_1.userModel({
                // Id: new mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                othername: req.body.othername,
                email: req.body.email,
                password: hash,
                date_of_birth: req.body.date_of_birth,
                state_of_origin: req.body.state_of_origin,
                phone: req.body.phone,
            });
            console.log(req.body);
            user
                .save()
                .then((user) => {
                const response = {
                    user: {
                        firstName: user.firstname,
                        lastName: user.lastname,
                        othername: user.othername,
                        email: user.email,
                        password: user.password,
                        date_of_birth: user.date_of_birth,
                        state_of_origin: user.state_of_origin,
                    },
                };
                res.send(response);
            })
                .catch((err) => {
                res.status(400).send(err.message);
            });
        }
    });
};
const loginUser = (req, res) => {
    userModel_1.userModel.find({ email: req.body.email }).then((user) => {
        if (user) {
            bcrypt_1.default.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    console.log("Authentication failed");
                }
                if (result) {
                    const token = jsonwebtoken_1.default.sign({
                        email: user[0].email,
                        userid: user[0]._id,
                    }, config_1.config.secretkey, { expiresIn: "1hr" });
                    res.send(token);
                }
                else {
                    res.status(401).send("Auth failed");
                }
            });
        }
    });
};
exports.default = {
    registerUser,
    loginUser,
};
