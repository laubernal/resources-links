import { scryptSync } from 'crypto';

import { User } from '../../Domain/entities/user.entity';
import { PasswordError, UserNotExistsError } from '../../Domain/error';
import { IUserRepository } from '../../Domain/interfaces/IUserRepository';
import { Email } from '../../Domain/vo';
import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { SignInDto } from '../Dto';
import { UserFilter } from '../../Domain/filters/UserFilter';

export class SignInUseCase implements IUseCase<User> {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: SignInDto): Promise<User> {
    try {
      const emailValidated = new Email(user.email);

      const filter = UserFilter.builder().withEmail(emailValidated);
      
      const userExists = await this.userRepository.getOne(filter);

      if (!userExists) {
        throw new UserNotExistsError();
      }

      if (!this.comparePasswords(userExists.password, user.password)) {
        throw new PasswordError('Incorrect password');
      }

      return userExists;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private comparePasswords(saved: string, supplied: string): boolean {
    const [hashed, salt] = saved.split('.');

    const suppliedHashedBuf = scryptSync(supplied, salt, 64);

    return hashed === suppliedHashedBuf.toString('hex');
  }
}
