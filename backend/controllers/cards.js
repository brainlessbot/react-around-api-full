const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .orFail()
    .then((data) => res.json(data))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.json(data))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findByIdAndDelete(id)
    .orFail()
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
    .populate('owner')
    .populate('likes')
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
    .populate('owner')
    .populate('likes')
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
