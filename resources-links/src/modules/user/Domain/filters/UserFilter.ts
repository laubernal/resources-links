import { Filter } from '../../../shared/Domain/filters/Filter';
import { Id } from '../../../shared/Domain/vo';
import { Email } from '../vo';

export class UserFilter extends Filter {
  public static ID_FILTER = 'user_id';
  public static EMAIL_FILTER = 'email';

  public static builder(): UserFilter {
    return new UserFilter();
  }

  protected data: Map<string, any> = new Map();

  public withUserId(userId: Id): this {
    this.data.set(UserFilter.ID_FILTER, userId);
    return this;
  }

  public withEmail(email: Email): this {
    this.data.set(UserFilter.EMAIL_FILTER, email);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
