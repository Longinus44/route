"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    Id: mongoose_1.default.Schema.Types.ObjectId,
    firstname: { type: String, required: true, min: 4 },
    lastname: { type: String, required: true, min: 4 },
    othername: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6, max: 20 },
    date_of_birth: { type: Date, required: true },
    state_of_origin: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    image: {
        contentType: String,
        url: String,
    },
    created: { type: String },
});
exports.userModel = mongoose_1.default.model("User", userSchema);
