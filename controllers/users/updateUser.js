import User from "#models/user.js";
import { userSchema, validate } from "#validation/index.js";

export const updateUser = async (request, response, next) => {
  const { user, body } = request;
  const { subscription } = body;
  const [isValid, resultOrError] = await validate(userSchema, { subscription });

  if (isValid) {
    try {
      const { email } = await User.findByIdAndUpdate(user.id, { subscription });

      return response.status(200).json({
        status: "Success",
        code: 200,
        data: { email, subscription },
      });
    } catch (error) {
      next(error);

      return;
    }
  }

  return response.status(400).json({
    status: "Bad Request",
    code: 400,
    message: resultOrError,
  });
};
