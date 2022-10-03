class ErrorBadRequest extends Error {
  message;

  code = 400;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export default ErrorBadRequest;
