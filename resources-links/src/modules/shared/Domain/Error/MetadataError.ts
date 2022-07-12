import { CustomError } from './CustomError';

export class MetadataError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, MetadataError.prototype);
  }

  serialize() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
