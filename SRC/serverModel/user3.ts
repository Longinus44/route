import mongoose, { Types, Schema } from "mongoose";

interface Iuser {
  //   _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  othername: string;
  email: string;
  Date_of_Birth: string;
  password: string;
  phone_Number: number;
  state_of_origin: string;
  image: string;
}

const userSchema = new mongoose.Schema({
  //   _id: mongoose.Schema.Types.ObjectId,
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  othername: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Date_of_Birth: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  },
  phone_Number: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 11,
  },
  state_of_origin: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

export const userModel = mongoose.model<Iuser>("Store", userSchema);
