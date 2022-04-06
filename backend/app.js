require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(routes);

app.listen(PORT);
