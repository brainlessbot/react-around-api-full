class ResourceNotFoundError extends Error {
  constructor() {
    super('Requested resource not found.');
    this.statusCode = 404;
  }
}

module.exports = ResourceNotFoundError;
