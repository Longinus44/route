"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sdatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class sdatabase {
    static connect(databasename, databasepassword) {
        const connectdb = mongoose_1.default.connect(`mongodb+srv://${databasename}:${databasepassword}@cluster0.03prske.mongodb.net/?retryWrites=true&w=majority`);
        connectdb
            .then(() => {
            console.log("DATA_BASE linked");
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
exports.sdatabase = sdatabase;
