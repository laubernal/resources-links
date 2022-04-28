import { Id, Text } from '../../../shared/Domain/vo';
import { CategoryVo, Link } from '../vo';

export class Resource {
  public static build(
    title: Text,
    link: Link,
    note: Text,
    userId: string,
    categories: CategoryVo[]
  ): Resource {
    return new Resource(Id.generate(), title.value, link.value, note.value, userId, categories);
  }

  constructor(
    private _id: string,
    private _title: string,
    private _link: string,
    private _note: string,
    private _userId: string,
    private _categories: CategoryVo[],
    private _createdAt?: Date,
    private _updatedAt?: Date
  ) {}

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get link(): string {
    return this._link;
  }

  public get note(): string {
    return this._note;
  }

  public get userId(): string {
    return this._userId;
  }

  public get categories(): CategoryVo[] {
    return this._categories;
  }

  public get createdAt(): Date | undefined {
    return this._createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this._updatedAt;
  }
}
