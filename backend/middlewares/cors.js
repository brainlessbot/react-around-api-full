const allowedCors = [
  'https://brainlessbot.students.nomoreparties.sbs',
  'https://www.brainlessbot.students.nomoreparties.sbs',
];

const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { origin, 'access-control-request-headers': requestedHeaders } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', allowedMethods);
    res.setHeader('Access-Control-Allow-Headers', requestedHeaders);
    return res.end();
  }

  return next();
};

module.exports = cors;
