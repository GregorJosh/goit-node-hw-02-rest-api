export const internalError = (error, request, response, next) => {
  console.log(error.stack);

  response.status(500).json({
    status: "fail",
    code: 500,
    message: error.message,
    data: "Internal Server Error",
  });
};
