"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel_1 = require("../MODEL/userModel");
const router = express_1.default.Router();
const getUser = (req, res) => {
    userModel_1.userModel.find()
        .select("firstname lastname othername email password date_of_birth state_of_origin")
        .then((user) => {
        if (user) {
            res.status(200).send({
                count: user.length,
                user: user,
            });
        }
        else {
            res.status(404).send("Not Found");
        }
    })
        .catch((err) => {
        res.status(400).send(err.message);
    });
};
const getUserById = (req, res) => {
    const id = req.params.id;
    userModel_1.userModel.findById(id)
        .then((user) => {
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send("Not Found");
        }
    })
        .catch((err) => {
        res.status(400).send("wrong input");
    });
};
const getUserByEmail = (req, res) => {
    const email = req.params.email;
    userModel_1.userModel.find({ email: email })
        .then((user) => {
        res.send(user);
    })
        .catch((err) => {
        res.status(404).send(err.message);
    })
        .catch((err) => {
        res.status(400).send("wrong input");
    });
};
exports.default = {
    getUser,
    getUserById,
    getUserByEmail,
};
