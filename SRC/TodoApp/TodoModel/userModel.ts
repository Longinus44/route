import mongoose, { Types } from "mongoose";

interface Iuser {
  id: Types.ObjectId;
  username: string;
  password: string;
  Todo: [];
}

const userSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Todo: [
    {
      type: Types.ObjectId,
      ref: "Todo",
      required: true,
    },
  ],
});

export const userModel = mongoose.model<Iuser>("User", userSchema);
