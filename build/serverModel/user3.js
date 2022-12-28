"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    //   _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    othername: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        MessageEvent,
    },
    Date_of_Birth: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        // maxlength: 20,
    },
    phone_Number: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 11,
    },
    state_of_origin: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
        profile_url: String,
    },
});
exports.userModel = mongoose_1.default.model("Store", userSchema);
