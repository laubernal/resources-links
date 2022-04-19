import { Id, VO } from '../../../shared/Domain/vo';

export class CategoryVo extends VO {
  constructor(private id: string, private name: string) {
    super();
    this.validateId();
    this.validate();
  }

  public get value(): string {
    return this.name;
  }

  private validate(): void {
    this.name = this.name.trim();
    this.isEmpty(this.name);
  }

  private validateId(): void {
    this.id = Id.validUuid(this.id);
  }
}
