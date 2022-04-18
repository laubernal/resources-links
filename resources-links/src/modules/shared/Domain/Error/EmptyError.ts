import { CustomError } from '../../../shared/Domain/Error/CustomError';

export class EmptyError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, EmptyError.prototype);
  }

  serialize() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
