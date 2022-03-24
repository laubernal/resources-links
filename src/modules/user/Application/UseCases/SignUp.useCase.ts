import chalk from 'chalk';
import { User } from '../../Domain/entities/user.entity';
import { IUserRepository } from '../../Domain/interfaces/IUserRepository';
import { Email, Name, Password } from '../../Domain/vo';
import { IUseCase } from './IUseCase';

export class SignUpUseCase implements IUseCase<string> {
  constructor(private userRepository: IUserRepository) {}

  public async execute(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<string> {
    try {
      chalk.cyan(console.log('sign up use case'));
      const emailValidated = new Email(email);
      const userExists = await this.userRepository.getOneByEmail(emailValidated.value);

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
      throw new Error(`Error sign up use case - ${error.message}`);
    }
  }
}
