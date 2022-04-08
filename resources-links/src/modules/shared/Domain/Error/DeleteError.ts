import { CustomError } from '../../../shared/Domain/Error/CustomError';

export class DeleteError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DeleteError.prototype);
  }

  serialize() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
