"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const express_1 = __importDefault(require("express"));
const userModel_1 = require("../MODEL/userModel");
const router = express_1.default.Router();
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { firstname, lastname } = req.body;
        const check = userModel_1.userModel.findByIdAndUpdate({ _id: id }, { $set: { firstname, lastname } }, { new: true });
        const result = await check;
        if (result) {
            return res.send({
                result,
                updated_at: new Date(),
            });
        }
        return res.status(404).send("User not found");
    }
    catch (err) {
        res.status(400).send(err);
    }
};
exports.updateUser = updateUser;
exports.default = {
    router,
    updateUser: exports.updateUser,
};
