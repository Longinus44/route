"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    static connect(dataBasename, dataBasekey) {
        const connectDB = mongoose_1.default.connect(`mongodb+srv://${dataBasename}:${dataBasekey}@cluster0.03prske.mongodb.net/?retryWrites=true&w=majority`);
        connectDB
            .then(() => {
            console.log("Database connected successfully");
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
exports.Database = Database;
