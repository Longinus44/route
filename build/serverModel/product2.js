"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productmodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productModel = new mongoose_1.default.Schema({
    Id: mongoose_1.default.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    // createdAt:Date.now()
});
exports.productmodel = mongoose_1.default.model("Product", productModel);
