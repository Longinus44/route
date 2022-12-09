"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../serverConfig/config");
const signup_validator_1 = __importDefault(require("../middleware/signup validator"));
const express_1 = __importDefault(require("express"));
const user2_1 = require("../serverModel/user2");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { check, validationResult } from "express-validator";
const sign_up_1 = require("../middleware/sign-up");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    user2_1.userModel.find().then((result) => {
        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.send("No users found");
        }
    });
});
router.post("/signup", sign_up_1.bodySchema, signup_validator_1.default, (req, res) => {
    user2_1.userModel.find({ email: req.body.email })
        .then((result) => {
        if (result.length > 0) {
            res.send("email is already registered");
        }
        else {
            bcrypt_1.default.hash(req.body.password, 5, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                else {
                    const user = new user2_1.userModel({
                        email: req.body.email,
                        password: hash,
                    });
                    user
                        .save()
                        .then((result) => {
                        res.send("sign-up successful");
                        console.log(result);
                    })
                        .catch((err) => {
                        res.send(err.message);
                    });
                }
            });
        }
    })
        .catch((err) => {
        console.log(err.message);
    });
});
router.post("/login", (req, res) => {
    user2_1.userModel.find({ email: req.body.email })
        .then((user) => {
        if (user.length <= 0) {
            res.send("Auth failed due to email address");
        }
        else {
            bcrypt_1.default.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    const token = jsonwebtoken_1.default.sign({
                        email: user[0],
                        userId: user[0]._id,
                    }, config_1.sConfig.JWTKEY, { expiresIn: "1hr" });
                    res.send("successful Auth" + token);
                }
                else {
                    res.send("Auth failed");
                }
            });
        }
    })
        .catch((err) => {
        res.send(err.message);
    });
});
router.delete("/:userId", (req, res) => {
    user2_1.userModel.deleteOne({ _id: req.params.userId })
        .then((result) => {
        res.send("delete user");
    })
        .catch((err) => {
        res.status(500).send(err.message);
    });
});
exports.default = router;
