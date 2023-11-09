export const currentUser = async (request, response, next) => {
  const { email, subscription } = request.user;

  return response.status(200).json({
    status: "OK",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};
