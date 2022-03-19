import { USERS_TABLENAME } from '../../../../constants/databaseTablenames';
import { BaseRepository } from '../../../shared/Infrastructure/repositories/BaseRepository';
import { User } from '../../Domain/entities/user.entity';
import { UserModel } from '../dataModel/UserModel';
import { UserMapper } from '../mappers/UserMapper';

export class UserRepository extends BaseRepository<UserModel, User> {
  protected mapper = new UserMapper();

  constructor() {
    super(USERS_TABLENAME)
  }

  public async save(user: User): Promise<void> {
    // USE PRISMA
  }

  public async getId(email: string): Promise<string> {
    // USE PRISMA
    return '';
  }
}