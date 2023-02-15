"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Todoschema = new mongoose_1.default.Schema({
    Title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
    },
    list: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.TodoSchema = mongoose_1.default.model("Todo", Todoschema);
