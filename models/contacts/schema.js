import { mongoose, Schema } from "mongoose";

const contact = new Schema({
  name: String,
  email: String,
  phone: String,
  favorite: Boolean,
});

export const Contact = mongoose.model("contact", contact);
