"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
const Order = require("../Model/order");
const Product = require("../Model/product");
router.get("/", (req, res) => {
    Order.find()
        .select("product quantity _id")
        .populate("product", "name")
        .then((result) => {
        const response = {
            count: result.length,
            products: result.map((result) => {
                return {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                    request: {
                        type: "get",
                        url: "http://localhost:5446/order/" + result._id,
                    },
                };
            }),
        };
        res.send(response);
    })
        .catch((err) => {
        res.send("error message");
    });
});
router.get("/:orderId", (req, res, next) => {
    const msg = "order not found";
    Order.findById(req.params.orderId)
        .populate("product", "name")
        .exec()
        .then((order) => {
        if (!order) {
            res.send(msg);
        }
        else {
            res.send({
                message: order,
                request: {
                    type: "get",
                    url: "http://localhost:5446/order",
                },
            });
        }
    })
        .catch((err) => {
        res.send(err.message);
    });
});
router.post("/", (req, res) => {
    Product.findById(req.body.productId)
        .then((product) => {
        if (!product) {
            res.send("productid not found");
        }
        else {
            const order = new Order({
                _id: new mongoose_1.default.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId,
            });
            return order.save().then((result) => {
                res.send({
                    message: "order made",
                    createdOrder: {
                        _id: result._id,
                        product: result.product,
                        quantity: result.quantity,
                        createdat: new Date(),
                    },
                    Request: {
                        type: "get",
                        url: "http://localhost:5446/order/" + result._id,
                    },
                });
                console.log(result);
            });
        }
    })
        .catch((err) => {
        res.status(500).send(err.message);
    });
});
router.delete("/:orderId", (req, res) => {
    const id = req.params.orderId;
    Order.deleteOne({ _Id: id })
        .exec()
        .then((result) => {
        console.log({ result, id });
        res.send({
            message: "order deleted",
            request: {
                type: "post",
                url: "http://localhost:5446/order",
                body: { productId: "ID", quantity: "NUMBER" },
            },
        });
    })
        .catch((err) => {
        res.send(err.message);
    });
});
exports.default = router;
