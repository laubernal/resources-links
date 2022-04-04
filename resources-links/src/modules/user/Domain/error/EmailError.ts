import { CustomError } from '../../../shared/Domain/Error/CustomError';

export class EmailError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, EmailError.prototype);
  }

  serialize() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
