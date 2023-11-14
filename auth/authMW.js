import passport from "passport";

const authOptions = {
  session: false,
};

export const authMW = (request, response, next) => {
  passport.authenticate(
    "jwt",
    authOptions,
    /* from strategy verify callback */ (error, user) => {
      if (!user || error) {
        return response.status(401).json({
          status: "Unauthorized",
          code: 401,
          message: "Not authorized.",
        });
      }

      request.user = user;

      next();
    }
  )(request, response, next);
};
