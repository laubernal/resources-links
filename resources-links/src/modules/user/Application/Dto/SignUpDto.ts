export class SignUpDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public passwordConfirmation: string
  ) {}
}
