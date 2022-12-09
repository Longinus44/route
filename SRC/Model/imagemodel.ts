import mongoose from "mongoose";
import multer from "multer";

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
    // required: true,
  },
});

export const imageModel = mongoose.model("image", imageSchema);
