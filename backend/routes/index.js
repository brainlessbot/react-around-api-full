const router = require('express').Router();
const cardRoutes = require('./cards');
const userRoutes = require('./users');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const errorHandler = require('../utils/error-handler');

router.use(cardRoutes, userRoutes);

router.get('*', () => {
  throw new ResourceNotFoundError();
});

router.use(errorHandler);

module.exports = router;
