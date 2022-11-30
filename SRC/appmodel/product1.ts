// import exp from "constants";
// import { v4 as uuidv4 } from "uuid";
import mongoose, { Types } from "mongoose";

// uuidv4();

export interface IProduct {
  _Id: Types.ObjectId;
  name: string;
  price: number;
}

const productSchema = new mongoose.Schema({
  _Id: mongoose.Schema.Types.ObjectId,
  sectId: String,
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    // default: 1,
    // timestamp: true,
    // min: 1,
    // max: 200000,
  },
});

export const Productmodel = mongoose.model<IProduct>("Product", productSchema);
// export default Productmodel;
