import { CustomError } from './index.errors';

export class BadRequestError extends CustomError {
  
  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{message: this.message}];
  }

  statusCode = 400;

  constructor(public message:  string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}