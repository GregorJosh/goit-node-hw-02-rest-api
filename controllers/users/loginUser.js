import JWT from "jsonwebtoken";
import { config } from "dotenv";

import User from "#models/user.js";
import { userSchema, validate } from "#validation/index.js";

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

  try {
    const user = await User.findOne({ email });
    const { id, subscription } = user;

    if (!user || !(await user.validPassword(user.password))) {
      return response.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
    }

    config();

    const token = await JWT.sign({ id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    user.token = token;
    await user.save();

    return response.status(200).json({
      status: "OK",
      code: 200,
      token: token,
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
