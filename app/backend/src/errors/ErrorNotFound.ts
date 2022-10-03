class ErrorNotFound extends Error {
  message;

  code = 404;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export default ErrorNotFound;
