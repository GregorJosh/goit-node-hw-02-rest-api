import User from "#models/user.js";

export const verifyUser = async (request, response, next) => {
  try {
    const { verificationToken } = request.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return response.status(404).json({
        status: "Not Found",
        code: 404,
        message: "User not found",
      });
    }

    user.verificationToken = " ";
    user.verified = true;
    await user.save();

    return response.status(200).json({
      status: "OK",
      code: 200,
      message: "Verification successful",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
