import { Database } from '../../../shared/Infrastructure/repositories/Database';
import { User } from '../../Domain/entities/user.entity';
import { UserNotExistsError } from '../../Domain/error';
import { IUserRepository } from '../../Domain/interfaces/IUserRepository';
import { UserMapper } from '../mappers/UserMapper';

export class UserRepository implements IUserRepository {
  protected mapper = new UserMapper();
  private prisma = Database.instance().connection();

  constructor() {}

  public async getOneByEmail(email: string): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!result) {
      return undefined;
    }

    this.prisma.$disconnect();

    return this.mapper.toDomain(result);
  }

  public async getAllBy(value: string): Promise<User | undefined> {
    return undefined;
  }

  public async save(user: User): Promise<void> {
    const newUser = this.mapper.toData(user);

    await this.prisma.user.create({
      data: newUser,
    });

    this.prisma.$disconnect();
  }

  public async getId(email: string): Promise<string> {
    const result = await this.prisma.user.findUnique({ where: { email }, select: { id: true } });

    if (!result) {
      throw new UserNotExistsError();
    }

    return JSON.stringify(result);
  }
}
