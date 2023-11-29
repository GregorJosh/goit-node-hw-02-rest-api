import User from "#models/user.js";
import { userSchema, validate } from "#validation/index.js";
import { sendVerificationMail } from "#config/sendVerificationMail.js";

export const reVerifyUser = async (request, response, next) => {
  try {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Missing required field email",
      });
    }

    const [isValid, _] = await validate(userSchema, { email });

    if (isValid) {
      const user = await User.findOne({ email }).lean();

      if (!user.verified) {
        await sendVerificationMail(email, user.verificationToken);

        return response.status(500).json({
          status: "OK",
          code: 500,
          message: "Verification email sent",
        });
      }

      return response.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Verification has already been passed",
      });
    }
  } catch (error) {
    next(error);
  }
};
