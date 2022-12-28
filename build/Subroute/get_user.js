"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user3_1 = require("../serverModel/user3");
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    user3_1.userModel.find()
        .select("firstname lastname othername? email password phone_Number Date_of_Birth state_of_origin image.profile_url  ")
        .then((user) => {
        if (user.length > 0) {
            res.send({
                count: user.length,
                users: user,
            });
        }
        else {
            res.send("No user to display");
        }
    })
        .catch((err) => {
        res.status(500).send(err.message);
    });
});
router.get("/get-by-id/:id", (req, res, next) => {
    // const File = req.file?.originalname;
    user3_1.userModel.findById(req.params.id).then((user) => {
        if (user) {
            const response = {
                status: 200,
                message: "user successfully fetched",
                data: {
                    Id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    othername: user.othername,
                    password: user.password,
                    email: user.email,
                    Date_of_Birth: user.Date_of_Birth,
                    state_of_origin: user.state_of_origin,
                    phone_Number: user.phone_Number,
                    // image: JSON.parse(user.image),
                },
            };
            res.send(response);
        }
        else {
            res.send("No user found.");
        }
    });
});
router.get("/get-by-email/:email", (req, res, next) => {
    const email = req.params.email;
    user3_1.userModel.findOne({ email })
        .then((user) => {
        if (user) {
            res.send(user);
        }
        else {
            res.send(" user with email not  found.");
        }
    })
        .catch((err) => {
        res.send(err.message);
    });
});
exports.default = router;
