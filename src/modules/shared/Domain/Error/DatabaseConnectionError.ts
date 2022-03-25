import { CustomError } from './CustomError';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;

  constructor() {
    super('Error connecting to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serialize() {
    return [
      {
        message: 'Error connecting to database',
      },
    ];
  }
}
