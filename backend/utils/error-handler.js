const mongoose = require('mongoose');
const AuthorizationError = require('../errors/AuthorizationError');
const IncorrectCredentialsError = require('../errors/IncorrectCredentialsError');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

const INVALID_DATA = 400;
const FORBIDDEN_USER = 403;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const { DocumentNotFoundError, ValidationError } = mongoose.Error;

const errorHandler = (error, req, res, next) => {
  if (error instanceof AuthorizationError) {
    res.status(FORBIDDEN_USER).json({ message: 'Authorization error.' });
    return;
  }

  if (error instanceof IncorrectCredentialsError) {
    res.status(INVALID_DATA).json({ message: 'Incorrect password or email.' });
    return;
  }

  if (error instanceof ResourceNotFoundError || error instanceof DocumentNotFoundError) {
    res.status(NOT_FOUND).json({ message: 'Requested resource not found.' });
    return;
  }

  if (error instanceof ValidationError) {
    res.status(INVALID_DATA).json({ message: error.message });
    return;
  }

  res.status(SERVER_ERROR).json({ message: 'An error has occurred on the server.' });
};

module.exports = errorHandler;
