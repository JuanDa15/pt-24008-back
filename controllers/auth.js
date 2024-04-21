const { request, response } = require("express");
const { serverError } = require("../utils/server-error");
const { compareSync, genSaltSync, hashSync } = require('bcryptjs')
const httpResponse = require("../utils/http-response");
const { generateJWT } = require("../utils/jwt")
const User = require("../models/User");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
          .status(404)
          .json(httpResponse(false, 'Email is not registered'));
    }

    const isValidPassword = compareSync(password, user.password);

    if (!isValidPassword) {
      return res
          .status(401)
          .json(httpResponse(false, 'Email or password invalid'));
    }

    const token = await generateJWT(user.id);
    return res.json(httpResponse(true, 'Login success', {...user.toJSON(), token}));
  } catch (error) {
    serverError(error, res)
  }
}

const register = async (req = request, res = response) => {
  const {name, email, password, type} = req.body;

  try {
    const isEmailUsed = await User.findOne({email});

    if (isEmailUsed) {
      return res
          .status(409)
          .json(httpResponse(false, 'Email is already registered'));
    }

    const user = new User({name, email, password, type});

    const salt = genSaltSync();
    user.password = hashSync(password, salt);

    await user.save();

    res.status(201).json(httpResponse(true, 'User created'));
  } catch (error) {
    serverError(error, res);
  }
}

const renew = async (req = request, res = response) => {
  const token = await generateJWT(req.uid);

  try {
    const user = await User.findById(req.uid);

    if (!user) {
      return res.status(404).json(httpResponse(false, 'User not found'));
    }

    res
        .status(200)
        .json(httpResponse(true, 'Token renewed', {token, ...user.toJSON()}));
  } catch (error) {
    serverError(error, res);
  }
}

module.exports = {
  login,
  register, 
  renew
}