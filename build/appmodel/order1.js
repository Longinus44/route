"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordermodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderschema = new mongoose_1.default.Schema({
    _Id: mongoose_1.default.Schema.Types.ObjectId,
    productId: {
        ref: "Product",
        type: mongoose_1.default.Schema.Types.ObjectId,
        String,
        required: true,
    },
    quantity: { type: Number, default: 1, required: true, max: 1000 },
});
exports.ordermodel = mongoose_1.default.model("Order", orderschema);
