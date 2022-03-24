import chalk from 'chalk';
import { Database } from '../../../shared/Infrastructure/repositories/Database';
import { User } from '../../Domain/entities/user.entity';
import { IUserRepository } from '../../Domain/interfaces/IUserRepository';
import { UserMapper } from '../mappers/UserMapper';

export class UserRepository implements IUserRepository {
  protected mapper = new UserMapper();
  private prisma = Database.instance().connection();

  constructor() {}

  public async getOneByEmail(email: string): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({ where: { email } });

    if (!result) {
      return undefined;
    }

    this.prisma.$disconnect();

    const userToModel = this.mapper.rawDataToModel(result);

    return this.mapper.toDomain(userToModel[0]);
  }

  public async getAllBy(value: string): Promise<User | undefined> {
    return undefined;
  }

  public async save(user: User): Promise<void> {
    const newUser = this.mapper.domainToPrisma(user);

    const result = await this.prisma.user.create({
      data: newUser,
    });

    chalk.cyan(console.log(`result ${result}`));

    this.prisma.$disconnect();
  }

  public async getId(email: string): Promise<string> {
    return '';
  }
}
