"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const product1_1 = require("../appmodel/product1");
const router = express_1.default.Router();
(0, uuid_1.v4)();
router.get("/:productId", (req, res) => {
    product1_1.Productmodel.findById(req.params.productId)
        .then((result) => {
        if (!result) {
            res.status(500).send("product Item not found");
        }
        else {
            res.send(result);
            console.log(result);
        }
    })
        .catch((err) => {
        console.log(err.message);
    });
});
router.get("/", (req, res) => {
    product1_1.Productmodel.find()
        .select("name price _id")
        .then((result) => {
        const response = {
            count: result.length,
            product: result.map((product) => {
                return {
                    name: product.name,
                    price: product.price,
                    _id: product._id,
                    Request: {
                        type: "get",
                        url: `http://localhost/product/${product._id}`,
                    },
                };
            }),
        };
        if (result.length <= 0) {
            res.send("no product found");
        }
        else {
            res.send(response);
        }
    })
        .catch((err) => {
        console.log(err);
    });
});
router.post("/", (req, res) => {
    const { name, price } = req.body;
    product1_1.Productmodel.find({ name }).then((result) => {
        if (result.length >= 1) {
            res.send("name already exist");
        }
        else {
            const product = {
                _Id: new mongoose_1.default.Types.ObjectId(),
                name,
                price,
            };
            new product1_1.Productmodel(product)
                .save()
                .then((result) => {
                res.send(result);
            })
                .catch((err) => {
                res.status(500).send({ message: err.message });
            });
        }
    });
});
router.patch("/:productId", (req, res) => {
    const id = req.params.productId;
    const { name, price } = req.body;
    product1_1.Productmodel.findByIdAndUpdate({ _Id: id }, { $set: { name, price } }, { new: true }).then((result) => {
        res.send(result);
        console.log(`${name} updated successfully`);
    });
    res.send("prod updated");
});
router.delete("/:productId", (req, res) => {
    const id = req.params.productId;
    product1_1.Productmodel.findByIdAndRemove({ _id: id })
        .exec()
        .then((result) => {
        if (!result) {
            res.status(500).send("product already removed");
        }
        else {
            res.send("product deleted");
            console.log(`${result.id}deleted`);
        }
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.default = router;
