import mongoose from "mongoose";

export class DataBase {
  static connect(databaseName: string, password: string): void {
    const connectToDB = mongoose.connect(
      `mongodb+srv://${databaseName}:${password}@cluster0.oubk9hf.mongodb.net/?retryWrites=true&w=majority`
    );

    connectToDB
      .then(() => {
        console.log("DB successfully connected to mongo");
      })
      .catch((error) => {
        console.log(
          `Error occurred while connecting to database. Error: ${error}`
        );
      });
  }
}
