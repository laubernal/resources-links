import { CustomError } from '../../../shared/Domain/Error/CustomError';

export class UserNotExistsError extends CustomError {
  statusCode = 400;

  constructor() {
    super('User does not exist');

    Object.setPrototypeOf(this, UserNotExistsError.prototype);
  }

  serialize() {
    return [
      {
        message: 'User does not exist',
      },
    ];
  }
}
