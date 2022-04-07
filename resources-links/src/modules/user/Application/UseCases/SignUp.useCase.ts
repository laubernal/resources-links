import { User } from '../../Domain/entities/user.entity';
import { PasswordError, UserAlreadyExistsError } from '../../Domain/error';
import { IUserRepository } from '../../Domain/interfaces/IUserRepository';
import { Email, Name, Password } from '../../Domain/vo';
import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { SignUpDto } from '../Dto';

export class SignUpUseCase implements IUseCase<string> {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: SignUpDto): Promise<string> {
    const emailValidated = new Email(user.email);

    const userExists = await this.userRepository.getOneByEmail(emailValidated.value);

    if (userExists) {
      throw new UserAlreadyExistsError();
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
  }
}
