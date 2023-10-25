const Joi = require("joi");

const contactSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

module.exports = contactSchema;
