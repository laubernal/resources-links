import { NotValidError } from '../Error';

export class VO {
  protected isEmpty(input: string): void {
    if (input.length === 0) {
      throw new NotValidError('Input must be filled');
    }
    return;
  }
}
