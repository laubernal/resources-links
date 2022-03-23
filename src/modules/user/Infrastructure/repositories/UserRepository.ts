import chalk from 'chalk';
import { Database } from '../../../shared/Infrastructure/repositories/Database';
import { User } from '../../Domain/entities/user.entity';
import { IUserRepository } from '../../Domain/interfaces/IUserRepository';
import { UserMapper } from '../mappers/UserMapper';

export class UserRepository implements IUserRepository {
  protected mapper = new UserMapper();
  private prisma = Database.instance().connection();

  constructor() {}

  public async getOneBy(email: string): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({ where: { email } });

    if (!result) {
      return undefined;
    }

    this.prisma.$disconnect();

    const userToModel = this.mapper.rawDataToModel(result);

    return this.mapper.toDomain(userToModel[0]);
  }

  public async getAllBy(column: string, value: string): Promise<User | undefined> {
    return undefined;
  }

  public async save(user: User): Promise<void> {
    // USE PRISMA
    const result = await this.prisma.user.create({
      data: {
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
      },
    });

    chalk.cyan(console.log(`result ${result}`));

    this.prisma.$disconnect();
  }

  public async getId(email: string): Promise<string> {
    // USE PRISMA

    return '';
  }
}
