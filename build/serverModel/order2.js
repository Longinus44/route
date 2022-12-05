"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordermodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderschema = new mongoose_1.default.Schema({
    _Id: mongoose_1.default.Schema.Types.ObjectId,
    product: {
        ref: "Product",
        type: mongoose_1.default.Schema.Types.ObjectId,
        String,
        // unique: true,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        max: 20000,
    },
});
exports.ordermodel = mongoose_1.default.model("Order", orderschema);
