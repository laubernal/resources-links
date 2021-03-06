import { User } from '../../Domain/entities/user.entity';
import { PasswordError } from '../../Domain/error';
import { AlreadyExistsError } from '../../../shared/Domain/Error/AlreadyExistsError';
import { IUserRepository } from '../../Domain/interfaces/IUserRepository';
import { Email, Name, Password } from '../../Domain/vo';
import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { SignUpDto } from '../Dto';
import { UserFilter } from '../../Domain/filters/UserFilter';

export class SignUpUseCase implements IUseCase<string> {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: SignUpDto): Promise<string> {
    try {
      const emailValidated = new Email(user.email);

      const filter = UserFilter.builder().withEmail(emailValidated);
      const userExists = await this.userRepository.getOne(filter);

      if (userExists) {
        throw new AlreadyExistsError('User already exists');
      }

      if (user.password !== user.passwordConfirmation) {
        throw new PasswordError('Passwords must match');
      }

      const newUser = User.build(
        new Name(user.firstName),
        new Name(user.lastName),
        emailValidated,
        new Password(user.password)
      );

      await this.userRepository.save(newUser);

      return await this.userRepository.getId(emailValidated.value);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
