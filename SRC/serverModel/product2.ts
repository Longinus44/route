import mongoose, { Types } from "mongoose";

interface Iproduct {
  Id: Types.ObjectId;
  name: string;
  price: number;
}

const productModel = new mongoose.Schema({
  Id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // createdAt:Date.now()
});

export const productmodel = mongoose.model<Iproduct>("Product", productModel);
