"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class dataBase {
    static connect(databasename, password) {
        const connectDB = mongoose_1.default.connect(`mongodb+srv://${databasename}:${password}@cluster0.oubk9hf.mongodb.net/?retryWrites=true&w=majority`);
        connectDB
            .then((result) => {
            console.log("connected to Database");
        })
            .catch((err) => {
            console.log(err.message);
        });
    }
}
exports.dataBase = dataBase;
