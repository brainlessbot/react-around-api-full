const validator = require('validator');

const validateLink = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error('string.uri');
};

module.exports = {
  validateLink,
};
