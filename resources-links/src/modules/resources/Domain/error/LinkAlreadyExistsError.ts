import { CustomError } from '../../../shared/Domain/Error/CustomError';

export class LinkAlreadyExistsError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Link already exists');

    Object.setPrototypeOf(this, LinkAlreadyExistsError.prototype);
  }

  serialize() {
    return [
      {
        message: 'Link already exists',
      },
    ];
  }
}
