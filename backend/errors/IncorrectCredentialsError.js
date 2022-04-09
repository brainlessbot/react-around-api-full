class IncorrectCredentialsError extends Error {
  constructor() {
    super('Incorrect password or email.');
    this.statusCode = 401;
  }
}

module.exports = IncorrectCredentialsError;
