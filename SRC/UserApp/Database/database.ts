import mongoose from "mongoose";

export class dataBase {
  static connect(databasename: String, password: String): void {
    const connectDB = mongoose.connect(
      `mongodb+srv://${databasename}:${password}@cluster0.oubk9hf.mongodb.net/?retryWrites=true&w=majority`
    );
    connectDB
      .then((result) => {
        console.log("connected to Database");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
