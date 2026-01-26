const Joi = require('joi');

const id = Joi.string().uuid();
const email = Joi.string().min(3).max(15);
const password = Joi.number().integer().min(3);
const role = Joi.string().uri();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
