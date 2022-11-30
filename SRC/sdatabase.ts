import mongoose from "mongoose";

export class sdatabase {
  static connect(sdatabasename: string, sdatabasepassword: string): void {
    const connectdb = mongoose.connect(
      `mongodb+srv://${sdatabasename}:${sdatabasepassword}@cluster0.oubk9hf.mongodb.net/?retryWrites=true&w=majority`
    );
    connectdb
      .then(() => {
        console.log("DATA_BASE linked");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
