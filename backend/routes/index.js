const router = require('express').Router();
const { errors } = require('celebrate');
const authRoutes = require('./auth');
const cardRoutes = require('./cards');
const userRoutes = require('./users');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const authMiddleware = require('../middlewares/auth');
const corsMiddleware = require('../middlewares/cors');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const errorHandler = require('../utils/error-handler');

router.use(requestLogger);

router.use(corsMiddleware);

// TEMPORARY
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now.');
  }, 0);
});

router.use(authRoutes);
router.use(authMiddleware, cardRoutes, userRoutes);

router.get('*', () => {
  throw new ResourceNotFoundError();
});

router.use(errorLogger);

router.use(errors()); // Celebrate's error handler
router.use(errorHandler); // App's error handler

module.exports = router;
