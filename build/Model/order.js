"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderschema = new mongoose_1.default.Schema({
    Id: mongoose_1.default.Schema.Types.ObjectId,
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, default: 1 },
});
module.exports = mongoose_1.default.model("Order", orderschema);
