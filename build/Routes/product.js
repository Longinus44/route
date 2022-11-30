"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = require("../Model/product");
const multer = require("multer");
const router = express_1.default.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + file);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});
const upload = multer({ storage: storage });
router.get("/", (req, res) => {
    product_1.ProductModel.find()
        .select("name price _id")
        .then((result) => {
        const response = {
            count: result.length,
            products: result.map((result) => {
                return {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:5446/product/" + result._id,
                    },
                };
            }),
        };
        if (result.length > 0) {
            res.send(response);
            console.log(result);
        }
        else {
            res.send("No entry found");
        }
    })
        .catch((err) => {
        console.log(err.message);
    });
});
router.get("/:productId", (req, res) => {
    const id = req.params.productId;
    product_1.ProductModel.findById(id)
        .then((result) => {
        if (result) {
            res.send(result);
        }
        else {
            res.send("No product found for provided Id");
        }
    })
        .catch((err) => {
        res.send("invalid Id");
    });
});
router.post("/", upload.single("productImage"), (req, res) => {
    const product = new product_1.ProductModel({
        _Id: new mongoose_1.default.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product
        .save()
        .then((result) => {
        res.send(result);
        console.log(result);
    })
        .catch((err) => {
        console.log(err);
    });
    // res.send('prod post made')
});
router.patch("/:productId", (req, res) => {
    const id = req.params.productId;
    const { name, price } = req.body;
    product_1.ProductModel.findByIdAndUpdate({ _id: id }, { $set: { name, price } }, { new: true })
        .exec()
        .then((result) => {
        res.send(result);
    })
        .catch((err) => {
        console.log(err);
    });
});
router.delete("/:productId", (req, res) => {
    const id = req.params.productId;
    product_1.ProductModel.remove({ _id: id })
        .exec()
        .then((result) => {
        console.log(result);
        res.send("delete successful");
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.default = router;
// function productImage(product: any): any {
//     throw new Error("Function not implemented.");
// }
