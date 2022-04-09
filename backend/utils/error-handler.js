const mongoose = require('mongoose');

const INVALID_DATA = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

const { DocumentNotFoundError, ValidationError } = mongoose.Error;

const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(INVALID_DATA).json({ message: error.message });
    return;
  }

  if (error instanceof DocumentNotFoundError) {
    res.status(NOT_FOUND).json({ message: 'Requested resource not found.' });
    return;
  }

  if (error.name === 'MongoServerError' && error.code === 11000) {
    res.status(CONFLICT).json({ message: 'Email address is already registered.' });
    return;
  }

  const { statusCode = SERVER_ERROR, message } = error;

  res.status(statusCode).json({
    message: statusCode === SERVER_ERROR ? 'An error has occurred on the server.' : message,
  });
};

module.exports = errorHandler;
