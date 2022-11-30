"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DataBase {
    static connect(databaseName, password) {
        const connectToDB = mongoose_1.default.connect(`mongodb+srv://${databaseName}:${password}@cluster0.oubk9hf.mongodb.net/?retryWrites=true&w=majority`);
        connectToDB
            .then(() => {
            console.log("DB successfully connected to mongo");
        })
            .catch((error) => {
            console.log(`Error occurred while connecting to database. Error: ${error}`);
        });
    }
}
exports.DataBase = DataBase;
