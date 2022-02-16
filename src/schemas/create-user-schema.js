const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(40).required(),
  lastName: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: new PasswordComplexity({
    min: 8,
    max: 25,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1
  })
});

module.exports = createUserSchema;
