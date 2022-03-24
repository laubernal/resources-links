import { Prisma } from '@prisma/client';
import { IMapper } from '../../../shared/Infrastructure/mappers/IMapper';
import { User } from '../../Domain/entities/user.entity';
import { UserModel } from '../dataModel/UserModel';

export class UserMapper implements IMapper<UserModel, User> {
  public rawDataToModel(user: any): UserModel[] {
    const userToModel = [];

    userToModel.push(
      new UserModel(
        user.us_id,
        user.us_first_name,
        user.us_last_name,
        user.us_email,
        user.us_password
      )
    );

    return userToModel;
  }

  public toDomain(user: UserModel): User {
    return new User(user.id, user.firstName, user.lastName, user.email, user.password);
  }

  public toData(user: User): UserModel {
    return new UserModel(user.id, user.firstName, user.lastName, user.email, user.password);
  }

  public domainToPrisma(user: User): Prisma.UserCreateInput {
    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
    };
  }
}
