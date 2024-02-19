const Joi = require("joi");
const Auth_Schema = require("../model/auth");
const bcrypt = require("bcrypt");
const { registerJoiSchema, loginJoiSchema } = require("../common/joiSchema");
const { signToken } = require("../common/jwt");

const register = async (req, res) => {
  try {
    const { error } = registerJoiSchema.validate(req.body);
    if (error) {
      return res.sendError(error.details, 400);
    }

    const { username, email, password } = req.body;

    const alreadyRegistered = await Auth_Schema.findOne({ email });
    if (alreadyRegistered) {
      return res.sendError("User already registered", 400);
    }

    const securePassword = await bcrypt.hash(password, 10);
    const savedUser = await Auth_Schema.create({
      username,
      email,
      password: securePassword,
    });

    const { password: privateField, ...data } = savedUser.toObject();
    const payload = {
      ...data,
      token: signToken(savedUser.id),
    };
    return res.sendSuccess(payload, "User has been registered");
  } catch (error) {
    return res.sendError(error.message, 500);
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginJoiSchema.validate(req.body);
    if (error) {
      return res.sendError(error.details, 400);
    }
    const { email, password } = req.body;
    const user = await Auth_Schema.findOne({ email });
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.sendError("Password does not match", 400);
    }

    const { password: Privatefield, ...data } = user.toObject();
    const payload = {
      ...data,
      token: signToken(user.id),
    };
    return res.sendSuccess(payload, "User Login Successfully");
  } catch (error) {
    return res.sendError(error.message, 500);
  }
};

const checkAuth = (req, res) => {};

module.exports = {
  register,
  login,
  checkAuth,
};
