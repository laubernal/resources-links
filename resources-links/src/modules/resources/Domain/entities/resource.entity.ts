import { Id } from '../../../user/Domain/vo';

export class Resource {
  public static build(title: string, link: string, note: string, userId: string): Resource {
    return new Resource(Id.generate(), title, link, note, userId);
  }

  constructor(
    private _id: string,
    private _title: string,
    private _link: string,
    private _note: string,
    private _userId: string,
    _createdAt?: Date,
    _updatedAt?: Date
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
}
