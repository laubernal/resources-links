import { scryptSync } from 'crypto';

import { IUserRepository } from '../../Domain/interfaces/IUserRepository';
import { Email } from '../../Domain/vo';
import { IUseCase } from './IUseCase';

export class SignInUseCase implements IUseCase<void> {
  constructor(private userRepository: IUserRepository) {}

  public async execute(email: string, password: string): Promise<void> {
    try {
      const emailValidated = new Email(email);

      const userExists = await this.userRepository.getOneByEmail(emailValidated.value);

      if (!userExists) {
        throw new Error('This user does not exist');
      }

      if (this.comparePasswords(userExists.password, password) === false) {
        throw new Error('Incorrect password');
      }
    } catch (error: any) {
      throw new Error(`Error sign in use case - ${error.message}`);
    }
    return;
  }

  private comparePasswords(saved: string, supplied: string): boolean {
    const [hashed, salt] = saved.split('.');

    const suppliedHashedBuf = scryptSync(supplied, salt, 64);

    return hashed === suppliedHashedBuf.toString('hex');
  }
}
