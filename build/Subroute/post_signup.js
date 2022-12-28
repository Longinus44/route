"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user3_1 = require("../serverModel/user3");
const signup_validator_1 = require("../middleware/signup validator");
const multer_1 = __importDefault(require("multer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.use("/signup", express_1.default.static("./upload/images"));
const storage = multer_1.default.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
router.post("/signup", signup_validator_1.validatesignupSchema, upload.single("image"), (req, res, next) => {
    var _a;
    const File = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    user3_1.userModel.init();
    const { email, phone_Number } = req.body;
    user3_1.userModel.find({ email, phone_Number })
        .then((user) => {
        if (user.length >= 1) {
            res.status(409).send("email/ Number already exists");
        }
        else {
            bcrypt_1.default.hash(req.body.password, 10, (err, hash) => {
                var _a;
                if (err) {
                    console.log(err.message);
                }
                else {
                    const user = new user3_1.userModel({
                        Id: new mongoose_1.default.Types.ObjectId(),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        othername: req.body.othername,
                        email: req.body.email,
                        password: hash,
                        Date_of_Birth: req.body.Date_of_Birth,
                        state_of_origin: req.body.state_of_origin,
                        phone_Number: req.body.phone_Number,
                        image: {
                            data: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
                            contentType: "image/jpeg",
                            profile_url: `http://localhost:6000/images/${File}`,
                        },
                    });
                    user
                        .save()
                        .then((user) => {
                        var _a;
                        const response = {
                            status: "success",
                            user: {
                                Id: user._id,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                othername: user.othername,
                                email: user.email,
                                Date_of_Birth: user.Date_of_Birth,
                                state_of_origin: user.state_of_origin,
                                phone_Number: user.phone_Number,
                                profile_url: `http://localhost:6000/images/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`,
                                // image: `http://localhost:6000/image/${req.file?.filename}`,
                            },
                        };
                        res.send(response);
                    })
                        .catch((err) => {
                        res.status(500).send(err.message);
                    });
                }
            });
        }
    })
        .catch((err) => {
        res.status(500).send(err.message);
    });
});
exports.default = router;
