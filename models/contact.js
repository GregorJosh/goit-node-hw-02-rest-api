import { mongoose, Schema } from "mongoose";

const contact = new Schema({
  name: {
    type: String,
    minLength: 3,
    match: /^[a-zA-ZąęćłńóśźżĄĘĆŁŃÓŚŹŻ ']+$/,
    required: true,
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
  favorite: Boolean,
});

export default mongoose.model("contact", contact);
