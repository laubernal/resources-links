import { CustomError } from '../../../shared/Domain/Error/CustomError';

export class NotValidError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotValidError.prototype);
  }

  serialize() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
