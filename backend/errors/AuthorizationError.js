class AuthorizationError extends Error {
  constructor() {
    super('Authorization error.');
    this.statusCode = 401;
  }
}

module.exports = AuthorizationError;
