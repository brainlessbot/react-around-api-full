const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((data) => res.json(data))
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
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
