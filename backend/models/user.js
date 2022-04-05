const mongoose = require('mongoose');

// eslint-disable-next-line no-useless-escape
const avatarRegex = /^https?:\/\/(www\.)?[A-Za-z0-9-.]+\.[A-Za-z0-9-.]+[A-Za-z0-9-._~:?%#@!$&'()*+,;=\/\[\]]*$/i;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (value) => avatarRegex.test(value),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
