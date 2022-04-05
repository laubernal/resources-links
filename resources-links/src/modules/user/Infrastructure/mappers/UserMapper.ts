import { Prisma } from '@prisma/client';

import { IMapper } from '../../../shared/Infrastructure/mappers/IMapper';
import { User } from '../../Domain/entities/user.entity';

export class UserMapper implements IMapper<Prisma.UserCreateInput, User> {
  public toDomain(user: Prisma.UserCreateInput): User {
    return new User(user.id, user.first_name, user.last_name, user.email, user.password);
  }

  public toData(user: User): Prisma.UserCreateInput {
    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
    };
  }
}
