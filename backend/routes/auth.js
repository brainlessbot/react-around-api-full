const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { loginUser, createUser } = require('../controllers/users');
const { validateLink } = require('../utils/helpers');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), loginUser);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateLink),
  }),
}), createUser);

module.exports = router;
