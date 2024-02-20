const Joi = require("joi");

const registerJoiSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
const loginJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});


const todoJoiSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = {
  registerJoiSchema,
  loginJoiSchema,
  todoJoiSchema,
};
