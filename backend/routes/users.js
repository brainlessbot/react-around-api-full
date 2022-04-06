const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getMyself,
  getUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const { validateLink } = require('../utils/helpers');

router.get('/users', getUsers);

router.get('/users/me', getMyself);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateLink),
  }),
}), updateUserAvatar);

module.exports = router;
