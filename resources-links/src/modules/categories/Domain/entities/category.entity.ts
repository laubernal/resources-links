import { Id } from '../../../shared/Domain/vo';
import { Text } from '../../../shared/Domain/vo';

export class Category {
  public static build(name: Text): Category {
    return new Category(Id.generate(), name.value);
  }
  constructor(private _id: string, private _name: string) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }
}
