import { randomBytes, scryptSync } from 'crypto';

import { VO } from './VO';
import { ObjectDefinition } from '../../../../types/objectDefinition.types';
import {
  LOWER_CASE_REGEX,
  NUMBER_REGEX,
  SYMBOL_REGEX,
  UPPER_CASE_REGEX,
} from '../../../../constants/passwordRegex.constants';

const defaultOptions: ObjectDefinition = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10,
};

export class Password extends VO {
  constructor(private password: string) {
    super();
    this.validate();
    this.password = this.hashPassword(this.password);
  }

  public get value(): string {
    return this.password;
  }

  private validate(): void {
    this.password = this.password.trim();
    this.isEmpty(this.password);
    const strength = this.isStrong(this.password);

    if (strength === false) {
      throw new Error('Password must be stronger');
    }
  }

  private hashPassword(password: string): string {
    const salt = randomBytes(8).toString('hex');
    const buf = scryptSync(password, salt, 64);

    return `${buf.toString('hex')}.${salt}`;
  }

  private countCharacters(password: string): Object {
    let count: ObjectDefinition = {};
    password.split('').forEach((character: string) => {
      let currentValue = count[character];

      if (currentValue) {
        count[character] += 1;
      } else {
        count[character] = 1;
      }
    });

    return count;
  }

  private analyzePassword(password: string): Object {
    let characterMap: ObjectDefinition = this.countCharacters(password);
    let analysis = {
      length: password.length,
      uniqueCharacters: Object.keys(characterMap).length,
      upperCaseCount: 0,
      lowerCaseCount: 0,
      numberCount: 0,
      symbolCount: 0,
    };

    Object.keys(characterMap).forEach((character: string) => {
      if (UPPER_CASE_REGEX.test(character)) {
        analysis.upperCaseCount += characterMap[character];
      }
      if (LOWER_CASE_REGEX.test(character)) {
        analysis.lowerCaseCount += characterMap[character];
      }
      if (NUMBER_REGEX.test(character)) {
        analysis.numberCount += characterMap[character];
      }
      if (SYMBOL_REGEX.test(character)) {
        analysis.symbolCount += characterMap[character];
      }
    });

    return analysis;
  }

  private isStrong(password: string): boolean {
    const analysis: ObjectDefinition = this.analyzePassword(password);

    return (
      analysis.length >= defaultOptions.minLength &&
      analysis.lowerCaseCount >= defaultOptions.minLowercase &&
      analysis.upperCaseCount >= defaultOptions.minUppercase &&
      analysis.numberCount >= defaultOptions.minNumbers &&
      analysis.symbolCount >= defaultOptions.minSymbols
    );
  }
}
