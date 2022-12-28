"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel_1 = require("../MODEL/userModel");
const router = express_1.default.Router();
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    userModel_1.userModel.findByIdAndDelete(id)
        .then((user) => {
        res.send("user deleted");
    })
        .catch((err) => {
        res.send("deleted");
    });
});
exports.default = router;
