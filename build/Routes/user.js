"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
//   let home =  fs.readFile("./files/land.html");
const router = express_1.default.Router();
const User = require("../Model/user");
// let home = document.getElementById;
router.get("/", (req, res) => {
    User.find()
        .select("email password id")
        .then((user) => {
        if (user.length <= 0) {
            res.send("user empty");
        }
        else {
            res.send({
                count: user.length,
                user,
            });
        }
    });
});
router.post("/signup", (req, res) => {
    User.find({ email: req.body.email })
        // .exec()
        .then((user) => {
        if (user.length >= 1) {
            res.send("email already exists");
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.send(err.message);
                }
                else {
                    const user = new User({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                    });
                    user
                        .save()
                        .then((result) => {
                        res.send("user created successfully");
                        console.log(result);
                    })
                        .catch((err) => {
                        console.log(err.message);
                    });
                }
            });
        }
    });
});
router.post("/login", (req, res) => {
    const code = "secretAccessKey";
    User.find({ email: req.body.email })
        .then((user) => {
        if (user.length < 1) {
            res.send("Auth failed");
        }
        else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    res.send("auth failed");
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0],
                        userId: user[0]._id,
                    }, 
                    /*process.env.JWTKEY*/ code, {
                        expiresIn: "1h",
                    });
                    res.send({
                        message: "Auth successful",
                        token: token,
                    });
                }
                else {
                    res.status(200).json({
                        message: "Auth failed",
                    });
                }
            });
        }
    })
        .catch((err) => {
        res.send(err.message);
    });
});
router.delete("/:userId", (req, res) => {
    User.deleteOne({ id: req.params.userId })
        .exec()
        .then((result) => {
        res.send("user deleted successfully");
    })
        .catch((err) => {
        console.log(err.message);
    });
});
exports.default = router;
