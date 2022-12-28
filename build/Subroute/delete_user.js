"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user3_1 = require("SRC/serverModel/user3");
const router = express_1.default.Router();
router.delete("/:id", (req, res, next) => {
    user3_1.userModel.findByIdAndRemove(req.params.id).then((user) => {
        if (!user) {
            res.send("No user found");
        }
        else {
            res.send("User deleted");
        }
    });
});
exports.default = router;
