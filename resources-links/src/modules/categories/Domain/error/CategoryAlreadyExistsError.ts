import { CustomError } from '../../../shared/Domain/Error/CustomError';

export class CategoryAlreadyExistsError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Category already exists');

    Object.setPrototypeOf(this, CategoryAlreadyExistsError.prototype);
  }

  serialize() {
    return [
      {
        message: 'Category already exists',
      },
    ];
  }
}
