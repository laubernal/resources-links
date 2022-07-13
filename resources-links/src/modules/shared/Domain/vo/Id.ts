import { v4 as uuidv4 } from 'uuid';

import isUUID from '../../../resources/Domain/utils/isUuid';
import { NotValidError } from '../Error';
import { VO } from './VO';

export class Id extends VO {
  constructor(private id: string) {
    super();
    this.validUuid(id);
  }

  public static generate(): string {
    return uuidv4();
  }

  private validUuid(id: string): string {
    if (!isUUID(id)) {
      throw new NotValidError('Id not valid');
    }

    return id;
  }

  public get value(): string {
    return this.id;
  }
}
