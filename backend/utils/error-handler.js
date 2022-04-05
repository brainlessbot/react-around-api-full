const mongoose = require('mongoose');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

const INVALID_DATA = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const { DocumentNotFoundError, ValidationError } = mongoose.Error;

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(INVALID_DATA).json({ message: error.message });
    return;
  }

  if (error instanceof ResourceNotFoundError || error instanceof DocumentNotFoundError) {
    res.status(NOT_FOUND).json({ message: 'Requested resource not found.' });
    return;
  }

  res.status(SERVER_ERROR).json({ message: 'An error has occurred on the server.' });
};

module.exports = errorHandler;
