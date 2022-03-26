import { CustomError } from '../../../shared/Domain/Error/CustomError';

export class PasswordError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, PasswordError.prototype);
  }

  serialize() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
