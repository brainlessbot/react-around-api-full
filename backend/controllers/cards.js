const AuthorizationError = require('../errors/AuthorizationError');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail()
    .then((data) => res.json(data))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.status(201).json(data))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .orFail()
    .then((data) => {
      if (!data.owner.equals(req.user._id)) {
        throw new AuthorizationError();
      }

      return Card.findByIdAndDelete(id).orFail();
    })
    .then((data) => res.json(data))
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(id, {
    $addToSet: {
      likes: req.user._id,
    },
  }, { new: true })
    .orFail()
    .then((data) => res.json(data))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(id, {
    $pull: {
      likes: req.user._id,
    },
  }, { new: true })
    .orFail()
    .then((data) => res.json(data))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
