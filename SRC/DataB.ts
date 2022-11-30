import mongoose from "mongoose";
export class Database {
  static connect(databasename: string, password: string): void {
    const connectDB = mongoose.connect(
      `mongodb+srv://${databasename}:${password}@cluster0.03prske.mongodb.net/?retryWrites=true&w=majority`
    );
    connectDB
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((err) => {
        console.log("error while connecting to database");
      });
  }
}
