import User from "#models/user.js";
import { userSchema, validate } from "#validation/index.js";

export const signupUser = async (request, response, next) => {
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
    const user = await User.findOne({ email }, { email: 1 }).lean();

    if (user) {
      return response.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
    }

    const newUser = new User({ email });
    const { subscription } = newUser;

    await newUser.setPassword(password);
    await newUser.save();

    return response.status(201).json({
      status: "Created",
      code: 201,
      data: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};
