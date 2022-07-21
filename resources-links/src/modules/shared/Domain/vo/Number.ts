import { NotValidError } from '../Error';
import { VO } from './VO';

export class Number extends VO {
  constructor(private number: number) {
    super();
    this.validNumber(this.number);
  }

  private validNumber(number: number): number {
    if (typeof number !== 'number' || number < 0) {
      throw new NotValidError('Value not valid');
    }

    return number;
  }

  public get value(): number {
    return this.number;
  }
}
