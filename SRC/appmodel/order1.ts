import mongoose, { Types } from "mongoose";

interface Iorder {
  _id: string;
  productId: Types.ObjectId;
  quantity: number;
}

const orderschema = new mongoose.Schema({
  _Id: mongoose.Schema.Types.ObjectId,
  productId: {
    ref: "Product",
    type: mongoose.Schema.Types.ObjectId,
    String,
    required: true,
  },
  quantity: { type: Number, default: 1, required: true, max: 1000 },
});

export const ordermodel = mongoose.model<Iorder>("Order", orderschema);
