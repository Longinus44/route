"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel_1 = require("SRC/MODEL/userModel");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    userModel_1.userModel.find()
        .select("firstname lastname othername email password date_of_birth state_of_origin")
        .then((user) => {
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send("Not Found");
        }
    })
        .catch((err) => {
        res.send(err.message);
    });
});
router.get("/get-by-id/:id", (req, res) => {
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
});
router.get("/get-by-email/:email", (req, res) => {
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
});
exports.default = router;
