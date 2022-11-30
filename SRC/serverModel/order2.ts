import mongoose, { Types } from "mongoose";

interface Iorder {
  Id: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
}

const orderschema = new mongoose.Schema({
  orderId: mongoose.Schema.Types.ObjectId,
  productId: {
    type: String,
    unique: true,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    max: 20000,
  },
});

export const ordermodel = mongoose.model<Iorder>("Order", orderschema);
