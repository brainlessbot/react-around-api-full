const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((data) => res.json({
      token: jwt.sign({
        _id: data._id,
      }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      }),
    }))
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .orFail()
    .then((data) => res.json(data))
    .catch(next);
};

const getMyself = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((data) => res.json(data))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { id } = req.params;

  User.find({ _id: id })
    .orFail()
    .then((data) => res.json(data))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      email,
      password: hashedPassword,
      name,
      about,
      avatar,
    }))
    .then((data) => res.status(201).json(data))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((data) => res.json(data))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((data) => res.json(data))
    .catch(next);
};

module.exports = {
  loginUser,
  getUsers,
  getMyself,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
