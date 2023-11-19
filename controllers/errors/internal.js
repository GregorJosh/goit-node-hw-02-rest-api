export const internalError = (error, request, response, next) => {
  console.log(error.stack);

  return response.status(500).json({
    status: "Fail",
    code: 500,
    message: error.message,
    data: "Internal Server Error",
  });
};
