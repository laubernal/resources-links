import { User } from '../entities/user.entity';

export interface IUserRepository {
  getOneByEmail(email: string): Promise<User | undefined>;
  getAllBy(value: string): Promise<User | undefined>
  save(user: User): Promise<void>;
  getId(email: string): Promise<string>;
}
