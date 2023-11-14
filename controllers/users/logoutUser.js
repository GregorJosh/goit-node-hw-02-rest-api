import User from "#models/user.js";

export const logoutUser = async (request, response, next) => {
  try {
    await User.findByIdAndUpdate(request.user.id, { token: null });

    request.user = null;
  } catch (error) {
    next(error);
  }

  return response.status(204).end();
};
