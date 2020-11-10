import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;
  reasons = 'resource not found';

  constructor() {
    super('resource not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reasons }];
  }
}
