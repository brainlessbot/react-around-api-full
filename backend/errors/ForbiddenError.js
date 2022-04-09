class ForbiddenError extends Error {
  constructor() {
    super('Not allowed to perform requested action.');
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
