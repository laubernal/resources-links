import { Filter } from '../../../shared/Domain/filters/Filter';
import { Id, Text } from '../../../shared/Domain/vo';

export class UserFilter extends Filter {
  public static ID_FILTER = 'user_id';
  public static TITLE_FILTER = 'title';

  public static builder(): UserFilter {
    return new UserFilter();
  }

  protected data: Map<string, any> = new Map();

  public withUserId(userId: Id): this {
    this.data.set(UserFilter.ID_FILTER, userId);
    return this;
  }

  public withTitle(title: Text): this {
    this.data.set(UserFilter.TITLE_FILTER, title);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
