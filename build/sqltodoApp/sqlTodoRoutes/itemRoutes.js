"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemController_1 = require("../Controllers/itemController");
const userAuth_1 = require("../Auth/userAuth");
const userToken_1 = require("../Auth/userToken");
const router = express_1.default.Router();
router.get("/", itemController_1.itemController.getAllItem);
router.get("/:id", itemController_1.itemController.getAllItemById);
router.post("/:id", userAuth_1.authorisedUser, userToken_1.check_token, itemController_1.itemController.editItem);
router.patch("/by-id/:id", itemController_1.itemController.edit);
router.patch("/:id", userAuth_1.authorisedUser, userToken_1.check_token, itemController_1.itemController.updateItemStatus);
router.delete("/:id", userAuth_1.authorisedUser, userToken_1.check_token, itemController_1.itemController.deleteItem);
exports.default = router;
