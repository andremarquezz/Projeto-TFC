class ErrorUnauthorized extends Error {
  message;

  code = 401;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export default ErrorUnauthorized;
