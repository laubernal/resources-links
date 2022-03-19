import { User } from '../entities/user.entity';
import { IBaseRepository } from './IBaseRepository';

export interface IUserRepository extends IBaseRepository<User> {
  save(user: User): Promise<void>;
  getId(email: string): Promise<string>;
}
