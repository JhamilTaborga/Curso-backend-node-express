const Joi = require('joi');

const email = Joi.string().min(3).max(30);
const password = Joi.string().min(8);
const newPassword = Joi.string().min(8);
const token = Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/);

const loginAuthSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

const recoveryAuthSchema = Joi.object({
  email: email.required()
});

const changePasswordAuthSchema = Joi.object({
  token: token.required(),
  newPassword: password.required()
});

module.exports = {
  loginAuthSchema,
  recoveryAuthSchema,
  changePasswordAuthSchema,
};
