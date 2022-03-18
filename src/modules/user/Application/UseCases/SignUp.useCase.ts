import { User } from '../../Domain/entities/user.entity';
import { IUserRepository } from '../../Domain/interfaces/IUserRepository';
import { Email, Name, Password } from '../../Domain/vo';
import { IUseCase } from './IUseCase';

export class SignUp implements IUseCase<string> {
  constructor(public userRepository: IUserRepository) {}

  public async execute(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<string> {
    try {
      const emailValidated = new Email(email);
      const userExists = await this.userRepository.getOneBy('us_email', emailValidated.value);

      if (userExists) {
        throw new Error('This user already exists');
      }

      if (password !== passwordConfirmation) {
        throw new Error('Passwords must match');
      }

      const newUser = User.build(
        new Name(firstName),
        new Name(lastName),
        emailValidated,
        new Password(password)
      );

      await this.userRepository.save(newUser);
      return await this.userRepository.getId(emailValidated.value);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
