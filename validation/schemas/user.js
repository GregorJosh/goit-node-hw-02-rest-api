import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(
    /^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[-+*_]+).{8,}/
  ),
});