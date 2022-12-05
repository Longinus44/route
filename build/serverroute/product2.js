"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const product2_1 = require("../serverModel/product2");
// import checkAuth from '../middleware/chech-Auth2'
const checkAuth = require("../middleware/chech-Auth2");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    product2_1.productmodel.find()
        .then((result) => {
        if (result.length <= 0) {
            res.status(500).send("no product found");
        }
        else {
            const response = {
                count: result.length,
                product: result.map((result) => {
                    return {
                        Id: result.id,
                        name: result.name,
                        price: result.price,
                        request: {
                            type: "get",
                            url: "http://localhost/product" + result.id,
                        },
                    };
                }),
            };
            res.send(response);
        }
    })
        .catch((err) => {
        res.send(err.message);
    });
});
router.get("/:productId", (req, res) => {
    const id = req.params.productId;
    product2_1.productmodel.findById(id)
        .then((result) => {
        if (!result) {
            res.status(500).send("product not found");
        }
        else {
            res.send(result);
        }
    })
        .catch((err) => {
        res.send(err.message);
    });
});
router.post("/", checkAuth, (req, res) => {
    const name = req.body.name;
    product2_1.productmodel.findOne({ name })
        .then((result) => {
        if (result) {
            res.status(409).send("product exists");
        }
        else {
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
        }
    })
        .catch((err) => {
        res.send(err.message);
    });
});
router.patch("/:productId", (req, res) => {
    const id = req.params.productId;
    const { name, price } = req.body;
    product2_1.productmodel.findByIdAndUpdate({ _id: id }, { $set: { name, price } }, { new: true })
        .then((result) => {
        res.send("product updated");
        console.log(result);
    })
        .catch((err) => {
        res.status(500).send(err.message);
    });
});
router.delete("/:productId", (req, res) => {
    const id = req.params.productId;
    product2_1.productmodel.findByIdAndRemove(id)
        .exec()
        .then((result) => {
        res.send("product deleted");
    })
        .catch((err) => {
        res.send(err.message);
    });
});
exports.default = router;
