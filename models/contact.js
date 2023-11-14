import { model, Schema, SchemaTypes } from "mongoose";

const contact = new Schema({
  name: {
    type: String,
    minLength: 3,
    match: /^[a-zA-ZąęćłńóśźżĄĘĆŁŃÓŚŹŻ ']+$/,
    required: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    minLength: 3,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    required: true,
  },
  phone: {
    type: String,
    minLength: 5,
    match: /^[\d\+\-()]+$/,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
});

export default model("contact", contact);
