"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const product2_1 = require("../serverModel/product2");
// const auth = require("../middleware/chech-Auth2");
const check_auth_1 = require("../middleware/check-auth");
const multer_1 = __importDefault(require("multer"));
const imagemodel_1 = require("../Model/imagemodel");
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.use("/upload", express_1.default.static("./upload/images"));
// router.use(errHandler);
const storage = multer_1.default.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    // limits: {
    //   fileSize: 50000,
    // },
});
// function errHandler(err: any, req: Request, res: Response) {
//   console.log(err);
//   res.send(err.message);
// }
router.post("/upload", upload.single("image"), (req, res) => {
    var _a;
    const newImage = new imagemodel_1.imageModel({
        name: req.body.name,
        image: {
            data: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
            contentType: "image/jpeg",
        },
    });
    newImage
        .save()
        .then((result) => {
        var _a;
        const response = {
            status: true,
            message: "Image uploaded successfully",
            data: {
                // return {
                id: result.id,
                name: result.name,
                image: `http://localhost:6000/image/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`,
                // };
            },
        };
        res.send(response);
    })
        .catch((err) => {
        console.log(err);
        res.send(err.message);
    })
        .catch((err) => {
        res.send(err.message);
    });
});
router.get("/", check_auth_1.check_auth, (req, res) => {
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
router.post("/", (req, res) => {
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
