"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const product2_1 = require("../serverModel/product2");
const order2_1 = require("../serverModel/order2");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    order2_1.ordermodel.find()
        .then((result) => {
        if (result.length <= 0) {
            res.send("No results found");
        }
        else {
            res.send(result);
        }
    })
        .catch((err) => {
        res.send(err);
    });
});
router.get("/:orderId", (req, res) => {
    const id = req.params.orderId;
    order2_1.ordermodel.findById(id)
        .then((result) => {
        if (result) {
            res.send(result);
        }
        else {
            res.status(500).send("request not found");
        }
    })
        .catch((err) => {
        res.send("order get made");
    });
});
router.post("/", (req, res) => {
    const Id = req.body.productId;
    product2_1.productmodel.findById(Id)
        .then((result) => {
        console.log(result);
        if (result) {
            const order = new order2_1.ordermodel({
                orderId: new mongoose_1.default.Types.ObjectId(),
                productId: req.body.productId,
                quantity: req.body.quantity,
            });
            order
                .save()
                .then((result) => {
                res.send(result);
            })
                .catch((err) => {
                res.send(err);
            });
        }
        else {
            res.send("product doesn't exists");
        }
    })
        .catch((err) => {
        res.send(err.message);
    });
});
router.delete("/:orderId", (req, res) => {
    const id = req.params.orderId;
    order2_1.ordermodel.findByIdAndRemove({ _id: id })
        .then((result) => {
        if (result) {
            res.send(result + "deleted");
        }
        else {
            res.send("request not found");
        }
    })
        .catch((err) => {
        res.send("order get made");
    });
});
exports.default = router;
