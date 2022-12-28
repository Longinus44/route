"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("SRC/serverConfig/config");
const express_1 = __importDefault(require("express"));
const user3_1 = require("SRC/serverModel/user3");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/login", (req, res, next) => {
    user3_1.userModel.find({ email: req.body.email }).then((user) => {
        if (user.length <= 0) {
            res.send("auth failed");
        }
        else {
            bcrypt_1.default.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    console.log(err.message);
                }
                if (result) {
                    const token = jsonwebtoken_1.default.sign({
                        email: user[0],
                        userId: user[0]._id,
                    }, config_1.sConfig.JWTKEY, { expiresIn: "1hr" });
                    res.send(token);
                }
                else {
                    res.send("auth failed badly");
                }
            });
        }
    });
});
exports.default = router;
