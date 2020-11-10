import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  reasons = 'Error connecting to database';
  statusCode = 500;

  constructor() {
    super('error connecting to db');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reasons }];
  }
}
