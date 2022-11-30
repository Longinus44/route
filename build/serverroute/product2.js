"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const product2_1 = require("../serverModel/product2");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    product2_1.productmodel.find().then((result) => {
        res.send(result);
    });
});
router.get("/:productId", (req, res) => {
    res.send("id");
});
router.post("/", (req, res) => {
    const product = new product2_1.productmodel({
        _Id: new mongoose_1.default.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product
        .save()
        .then((result) => {
        res.send(result);
    })
        .catch((err) => {
        console.log(err);
    });
});
router.patch("/", (req, res) => {
    res.send("product updated");
});
router.delete("/", (req, res) => {
    res.send("product deleted");
});
