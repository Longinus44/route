import { dataBase } from "SRC/UserApp/Database/database";
import { Tconfig } from "../Todoconfig/TodoConfig";
import mongoose from "mongoose";

export class Database {
  static connect(dataBasename: string, dataBasekey: string) {
    const connectDB = mongoose.connect(
      `mongodb+srv://${dataBasename}:${dataBasekey}@cluster0.03prske.mongodb.net/?retryWrites=true&w=majority`
    );
    connectDB
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
