import { Id } from '../../../shared/Domain/vo';

export class UserFilter {
  protected static ID_FILTER = 'user_id';

  public static builder(): UserFilter {
    return new UserFilter();
  }

  protected data: Map<string, any> = new Map();

  public withUserId(userId: Id): this {
    this.data.set(UserFilter.ID_FILTER, userId);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
