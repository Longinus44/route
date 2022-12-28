"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletebyEmail = exports.deleteUser = void 0;
const express_1 = __importDefault(require("express"));
const userModel_1 = require("../MODEL/userModel");
const router = express_1.default.Router();
const deleteUser = (req, res) => {
    const id = req.params.id;
    userModel_1.userModel.findByIdAndDelete(id)
        .then((user) => {
        res.send("user deleted");
    })
        .catch((err) => {
        res.status(404).send("user with id not found");
    });
};
exports.deleteUser = deleteUser;
const deletebyEmail = (req, res) => {
    const email = req.params.email;
    userModel_1.userModel.deleteOne({ email })
        .then((user) => {
        res.send("user deleted");
    })
        .catch((err) => {
        res.send("user with email not found");
    });
};
exports.deletebyEmail = deletebyEmail;
