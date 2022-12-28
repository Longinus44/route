"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const express_1 = __importDefault(require("express"));
const userModel_1 = require("../MODEL/userModel");
const router = express_1.default.Router();
const updateUser = (req, res) => {
    const id = req.params.id;
    const { firstname, lastname } = req.body;
    userModel_1.userModel.findByIdAndUpdate({ _id: id }, { $set: { firstname, lastname } }, { new: true })
        .then((user) => {
        res.send({
            user,
            updated_at: new Date(),
        });
    })
        .catch((err) => {
        res.status(400).send(err.message);
    });
};
exports.updateUser = updateUser;
