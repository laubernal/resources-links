import { v4 as uuidv4 } from 'uuid';

export class Id {
  public static generate(): string {
    return uuidv4();
  }
}
