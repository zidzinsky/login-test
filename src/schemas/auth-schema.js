const Joi = require('joi');

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = authSchema;
