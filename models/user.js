import { model, Schema } from "mongoose";
import bCrypt from "bcryptjs";

const userSchema = {
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
};

const user = new Schema(userSchema);

user.methods.setPassword = async function (password) {
  const salt = await bCrypt.genSalt(6);
  const saltedPassw = await bCrypt.hash(password, salt);

  this.password = saltedPassw;
};

user.methods.validPassword = async function (password) {
  return await bCrypt.compare(password, this.password);
};

export default model("user", user);
