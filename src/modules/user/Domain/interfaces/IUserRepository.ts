import { User } from '../entities/user.entity';
import { IPostgreRepository } from './IPostgreRepository';

export interface IUserRepository extends IPostgreRepository<User> {
  save(user: User): Promise<void>;
  getId(email: string): Promise<string>;
}
