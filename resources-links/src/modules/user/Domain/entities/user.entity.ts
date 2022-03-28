import { Email, Id, Name, Password } from '../vo';

export class User {
  public static build(firstName: Name, lastName: Name, email: Email, password: Password): User {
    return new User(Id.generate(), firstName.value, lastName.value, email.value, password.value);
  }

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
