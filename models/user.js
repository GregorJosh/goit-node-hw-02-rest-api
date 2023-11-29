import { model, Schema } from "mongoose";
import bCrypt from "bcryptjs";
import gravatar from "gravatar";

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
  avatar: String,
  token: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
};

const user = new Schema(userSchema);

user.methods.setAvatar = function (email) {
  const url = gravatar.profile_url(email);
  
  this.avatar = url;
}

user.methods.setPassword = async function (password) {
  const salt = await bCrypt.genSalt(6);
  const saltedPassw = await bCrypt.hash(password, salt);

  this.password = saltedPassw;
};

user.methods.validPassword = async function (password) {
  return await bCrypt.compare(password, this.password);
};

export default model("user", user);
