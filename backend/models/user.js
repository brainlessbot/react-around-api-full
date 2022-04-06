const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const IncorrectCredentialsError = require('../errors/IncorrectCredentialsError');

const defaultUser = {
  name: 'Jacques Cousteau',
  about: 'Explorer',
  avatar: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} is not a valid email address!`,
    },
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: defaultUser.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: defaultUser.about,
  },
  avatar: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: false,
    default: defaultUser.avatar,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((data) => {
      if (!data) {
        throw new IncorrectCredentialsError();
      }

      return bcrypt.compare(password, data.password)
        .then((isMatched) => {
          if (!isMatched) {
            throw new IncorrectCredentialsError();
          }

          return data;
        });
    });
};

module.exports = mongoose.model('User', userSchema);
