import mongoose, { Types } from "mongoose";

interface Itodo {
  title: string;
  list: string;
  checked: boolean;
  user: {
    type: mongoose.Types.ObjectId;
    save(): string;
  };
}

const Todoschema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
  list: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const TodoSchema = mongoose.model<Itodo>("Todo", Todoschema);
