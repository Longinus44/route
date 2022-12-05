import mongoose, { Types } from "mongoose";
import { Type } from "typescript";

interface IUser {
  Id: Types.ObjectId;
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  Id: mongoose.Schema.Types.ObjectId,
  email: { type: String, unique: true, required: true },

  password: {
    type: String,
    required: true,
    min: 5,
    max: 20,
  },
});

export const userModel = mongoose.model<IUser>("User", userSchema);
