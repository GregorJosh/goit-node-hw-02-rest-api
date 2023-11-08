import JWT from "jsonwebtoken";
import { config } from "dotenv";

import User from "../../models/user.js";
import { userSchema, validate } from "../../validation/index.js";

export const loginUser = async (request, response, next) => {
  const { email, password } = request.body;
  const [isValid, ResultOrError] = await validate(userSchema, {
    email,
    password,
  });

  if (!isValid) {
    return response.status(400).json({
      status: "Bad Request",
      code: 400,
      message: ResultOrError,
    });
  }

  const user = await User.findOne({ email });
  const { id, subscription } = user;

  if (!user || !(await user.validPassword)) {
    return response.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is wrong",
    });
  }

  config();

  const token = JWT.sign({ id, email }, process.env.SECRET, {
    expiresIn: "1h",
  });

  return response.status(200).json({
    status: "OK",
    code: 200,
    token: token,
    user: {
      email,
      subscription,
    },
  });
};
