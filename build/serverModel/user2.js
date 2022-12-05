"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    Id: mongoose_1.default.Schema.Types.ObjectId,
    email: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 20,
    },
});
exports.userModel = mongoose_1.default.model("User", userSchema);
