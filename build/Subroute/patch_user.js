"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user3_1 = require("SRC/serverModel/user3");
const router = express_1.default.Router();
router.patch("/:id", (req, res, next) => {
    const id = req.params.id;
    const { firstname, lastname } = req.body;
    console.log(req.body);
    console.log(firstname + " " + lastname);
    user3_1.userModel.findByIdAndUpdate({ _id: id }, { $set: { firstname, lastname } }, { new: true })
        .exec()
        .then((result) => {
        res.send(result);
    })
        .catch((err) => {
        res.send(err.message);
    });
});
exports.default = router;
