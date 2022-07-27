import { User } from '../entities/user.entity';
import { UserFilter } from '../filters/UserFilter';

export interface IUserRepository {
  getOne(filter: UserFilter): Promise<User | undefined>;
  save(user: User): Promise<void>;
  getId(email: string): Promise<string>;
}
