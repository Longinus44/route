import mongoose, { Types } from "mongoose";

interface Iuser {
  Id: Types.ObjectId;
  firstname: string;
  lastname: string;
  othername: string;
  email: string;
  password: string;
  date_of_birth: number;
  state_of_origin: string;
  phone: number;
  image: string;
}

const userSchema = new mongoose.Schema({
  Id: mongoose.Schema.Types.ObjectId,
  firstname: { type: String, required: true, min: 4 },
  lastname: { type: String, required: true, min: 4 },
  othername: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6, max: 20 },
  date_of_birth: { type: Date, required: true },
  state_of_origin: { type: String, required: true },
  phone: { type: Number, required: true, unique: true },
  image: {
    contentType: String,
    url: String,
  },
});

export const userModel = mongoose.model<Iuser>("User", userSchema);
