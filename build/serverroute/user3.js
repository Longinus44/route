"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user3_1 = require("../serverModel/user3");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const signup_validator_1 = __importDefault(require("../middleware/signup validator"));
// import { validate } from "uuid";
const router = express_1.default.Router();
router.use("/signup", express_1.default.static("./upload/images"));
// router.use(errHandler);
const storage = multer_1.default.diskStorage({
    destination: (req, res, cb) => {
        return cb(null, "./upload/images");
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${path_1.default.extname(file.filename)}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
// function errHandler(err: any, req: Request, res: Response) {
//   console.log(err.message);
//   //   res.send(err.message);
// }
router.get("/", (req, res, next) => {
    user3_1.userModel.find()
        .then((user) => {
        if (user.length > 0) {
            res.send(user);
        }
        else {
            res.send("No user to display");
        }
    })
        .catch((err) => {
        res.status(500).send(err.message);
    });
});
router.get("/:id", (req, res, next) => {
    user3_1.userModel.findById(req.params.id).then((user) => {
        if (user) {
            res.send(user);
        }
        else {
            res.send("No user found.");
        }
    });
});
router.get("/:email", (req, res, next) => {
    user3_1.userModel.findOne({ email: req.params.email }).then((user) => {
        if (user) {
            res.send(user);
        }
        else {
            res.send(" user with email not  found.");
        }
    });
});
router.post("/signup", upload.single("image"), signup_validator_1.default, (req, res, next) => {
    user3_1.userModel.findOne({ email: req.body.email }).then((user) => {
        if (user != null) {
            res.send("email already exists");
        }
        else {
            const user = new user3_1.userModel({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                othername: req.body.othername,
                email: req.body.email,
                Date_of_Birth: req.body.Date_of_Birth,
                state_of_origin: req.body.state_of_origin,
                phone_Number: req.body.phone_Number,
                image: req.body.image,
            });
            user
                .save()
                .then((user) => {
                res.send(user);
            })
                .catch((err) => {
                res.send(err.message);
            });
        }
    });
});
router.post("/login", (req, res, next) => { });
router.patch("/:id", (req, res, next) => {
    const id = req.params.id;
    const { userModel } = req.body;
    user3_1.userModel.findByIdAndUpdate({ _id: id }, 
    // { phone_Number: phone_Number },
    // { lastname: lastname },
    { $set: { userModel } }, { new: true });
});
exports.default = router;
