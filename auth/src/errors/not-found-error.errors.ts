import { CustomError } from "./custom-error.errors";

class NotFoundError extends CustomError {
  statusCode = 404;
  
  constructor() {
    super('Page not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{message: 'Not found!'}];
  }
}

export { NotFoundError };