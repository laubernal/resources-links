import { scryptSync } from 'crypto';

import { User } from '../../Domain/entities/user.entity';
import { PasswordError, UserNotExistsError } from '../../Domain/error';
import { IUserRepository } from '../../Domain/interfaces/IUserRepository';
import { Email } from '../../Domain/vo';
import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';

export class SignInUseCase implements IUseCase<User> {
  constructor(private userRepository: IUserRepository) {}

  public async execute(email: string, password: string): Promise<User> {
    const emailValidated = new Email(email);

    const userExists = await this.userRepository.getOneByEmail(emailValidated.value);

    if (!userExists) {
      throw new UserNotExistsError();
    }

    if (!this.comparePasswords(userExists.password, password)) {
      throw new PasswordError('Incorrect password');
    }

    return userExists;
  }

  private comparePasswords(saved: string, supplied: string): boolean {
    const [hashed, salt] = saved.split('.');

    const suppliedHashedBuf = scryptSync(supplied, salt, 64);

    return hashed === suppliedHashedBuf.toString('hex');
  }
}
