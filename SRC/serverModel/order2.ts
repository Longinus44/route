import mongoose, { Types } from "mongoose";

interface Iorder {
  _Id: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
}

const orderschema = new mongoose.Schema({
  _Id: mongoose.Schema.Types.ObjectId,
  product: {
    ref: "Product",
    type: mongoose.Schema.Types.ObjectId,
    String,
    // unique: true,
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
