import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "dotenv";

import User from "../models/user.js";

config();

const options = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const verify = async ({ id }, onVerified) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return onVerified(new Error("User not found."));
    }

    return onVerified(null, user);
  } catch (error) {
    onVerified(error);
  }
};

export const authStrategy = new Strategy(options, verify);
