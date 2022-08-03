import { Text } from '../vo';

export class Ordenation {
  public static FIELD_FILTER = 'field';
  public static ASC_FILTER = 'asc';
  public static DESC_FILTER = 'desc';
  public static ORDENATION_FILTER = 'ordenation';

  private ordenation: Map<string, any> = new Map();

  public setField(field: Text): this {
    this.ordenation.set(Ordenation.FIELD_FILTER, field);
    return this;
  }

  public setDescOrder(): this {
    this.ordenation.set(Ordenation.DESC_FILTER, 'desc');
    return this;
  }

  public build(): Map<string, any> {
    return this.ordenation;
  }
}
