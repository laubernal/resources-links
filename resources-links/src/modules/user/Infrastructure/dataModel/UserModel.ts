export class UserModel {
  constructor(
    private _id: string,
    private _firstName: string,
    private _lastName: string,
    private _email: string,
    private _password: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get firstName(): string {
    return this._firstName;
  }
  public get lastName(): string {
    return this._lastName;
  }
  public get email(): string {
    return this._email;
  }
  public get password(): string {
    return this._password;
  }
}
