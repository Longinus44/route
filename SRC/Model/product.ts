import mongoose, { Types } from "mongoose";

interface IProduct {
  Id: Types.ObjectId;
  name: string;
  price: number;
}

const productschema = new mongoose.Schema({
  Id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  //   productImage: { type: String, required: true },
});

export const ProductModel = mongoose.model<IProduct>("Product", productschema);
