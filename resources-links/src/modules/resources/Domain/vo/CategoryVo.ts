import { VO } from '../../../shared/Domain/vo';

export class CategoryVo extends VO {
  constructor(private category: string) {
    super();
    this.validate();
  }

  public get value(): string {
    return this.category;
  }

  private validate(): void {
    this.category = this.category.trim();
  }
}
