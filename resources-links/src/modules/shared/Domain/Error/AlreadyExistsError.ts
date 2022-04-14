import { CustomError } from './CustomError';

export class AlreadyExistsError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, AlreadyExistsError.prototype);
  }

  serialize() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
