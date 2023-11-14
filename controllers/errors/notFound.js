export const notFound = (request, response) => {
  response.status(404).json({
    status: "error",
    code: 404,
    message: "Find routes and test them in openAPI documentation and testing tool on route: /doc",
    data: "Not found",
  });
};
