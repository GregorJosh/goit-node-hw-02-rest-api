import JWT from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "dotenv";

import User from "#models/user.js";

config();

const options = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const verify = async (token, onVerified) => {
  try {
    const user = await User.findById(token.id);

    if (!user) {
      throw new Error("User not found.");
    }

    const userToken = JWT.verify(user.token, process.env.SECRET);

    if (userToken.iat !== token.iat) {
      throw new Error("Not valid token.");
    }

    return onVerified(null, user);
  } catch (error) {
    onVerified(error);
  }
};

export const authStrategy = new Strategy(options, verify);
