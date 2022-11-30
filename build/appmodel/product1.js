"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Productmodel = void 0;
// import exp from "constants";
// import { v4 as uuidv4 } from "uuid";
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    _Id: mongoose_1.default.Schema.Types.ObjectId,
    sectId: String,
    name: { type: String, required: true },
    price: {
        type: Number,
        required: true,
        // default: 1,
        // timestamp: true,
        // min: 1,
        // max: 200000,
    },
});
exports.Productmodel = mongoose_1.default.model("Product", productSchema);
// export default Productmodel;
