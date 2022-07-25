import { Id } from '../../../shared/Domain/vo';

export class AuthFilter {
  protected static ID_FILTER = 'user_id';

  public static builder(): AuthFilter {
    return new AuthFilter();
  }

  protected data: Map<string, any> = new Map();

  public withUserId(userId: Id): this {
    this.data.set(AuthFilter.ID_FILTER, userId);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
