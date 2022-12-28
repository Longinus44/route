"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { sConfig } from "../serverConfig/config";
const express_1 = __importDefault(require("express"));
const get_user_1 = __importDefault(require("../Subroute/get_user"));
const post_signup_1 = __importDefault(require("../Subroute/post_signup"));
const delete_user_1 = __importDefault(require("../Subroute/delete_user"));
const router = express_1.default.Router();
router.use("/get", get_user_1.default);
router.use("/post", post_signup_1.default);
// router.use("/post/login", postlogin);
router.use("/delete", delete_user_1.default);
// router.use("/patch", patchroute);
exports.default = router;
