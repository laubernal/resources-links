import { Id, VO } from '../../../shared/Domain/vo';

export class CategoryVo extends VO {
  constructor(private _id: string, private _name: string) {
    super();
    this.validateId();
    this.validate();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  private validate(): void {
    this._name = this._name.trim();
    this.isEmpty(this._name);
  }

  private validateId(): void {
    this._id = new Id(this._id).value;
  }
}
