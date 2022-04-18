import { v4 as uuidv4 } from 'uuid';

import isUUID from '../../../resources/Domain/utils/isUuid';
import { NotValidError } from '../Error';
import { VO } from './VO';

export class Id extends VO {
  constructor() {
    super();
  }

  public static generate(): string {
    return uuidv4();
  }

  public static validUuid(id: string): string {
    if (!isUUID(id)) {
      throw new NotValidError('Id not valid');
    }

    return id;
  }
}
