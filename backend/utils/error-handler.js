const mongoose = require('mongoose');
const AuthorizationError = require('../errors/AuthorizationError');
const IncorrectCredentialsError = require('../errors/IncorrectCredentialsError');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

const INVALID_DATA = 400;
const UNAUTHORIZED_USER = 401;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const { DocumentNotFoundError, ValidationError } = mongoose.Error;

const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(INVALID_DATA).json({ message: error.message });
    return;
  }

  if (error instanceof AuthorizationError) {
    res.status(UNAUTHORIZED_USER).json({ message: 'Authorization error.' });
    return;
  }

  if (error instanceof IncorrectCredentialsError) {
    res.status(UNAUTHORIZED_USER).json({ message: 'Incorrect password or email.' });
    return;
  }

  if (error instanceof ResourceNotFoundError || error instanceof DocumentNotFoundError) {
    res.status(NOT_FOUND).json({ message: 'Requested resource not found.' });
    return;
  }

  console.log(error);

  res.status(SERVER_ERROR).json({ message: 'An error has occurred on the server.' });
};

module.exports = errorHandler;
