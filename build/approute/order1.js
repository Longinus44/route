"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const order1_1 = require("../appmodel/order1");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    order1_1.ordermodel.find()
        .then((result) => {
        const response = {
            count: result.length,
            Orders: result.map((result) => {
                return {
                    _Id: result.id,
                    product: result.productId,
                    quantity: result.quantity,
                };
            }),
        };
        res.send(response);
    })
        .catch((err) => {
        res.send("order error");
    });
});
router.get("/:orderId", (req, res) => {
    const id = req.params.orderId;
    order1_1.ordermodel.findById(id)
        .then((result) => {
        res.send(result);
    })
        .catch((err) => {
        res.send(err);
    });
});
router.post("/", (req, res) => {
    const order = new order1_1.ordermodel({
        _id: new mongoose_1.default.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
    });
    order
        .save()
        .then((result) => {
        res.send(result);
        console.log("order made");
    })
        .catch((err) => {
        res.send("order post made");
    });
});
router.patch("/", (req, res) => {
    res.send("order updated");
});
router.delete("/", (req, res) => {
    res.send("order deleted");
});
exports.default = router;
