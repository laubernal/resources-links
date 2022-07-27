import { UserFilter } from '../../Domain/filters/UserFilter';

export class PrismaUserFilterAdapter {
  constructor(private filter: UserFilter) {}

  public apply(): any {
    const filters = this.filter.apply();
    const query = {};

    // if (filters.has(UserFilter.ID_FILTER)) {
    //   const userId = filters.get(UserFilter.ID_FILTER) as Id;

    //   Object.assign(query, { where: { user_id: { equals: userId } } });
    // }

    if (filters.has(UserFilter.EMAIL_FILTER)) {
      const email = filters.get(UserFilter.EMAIL_FILTER) as Text;

      Object.assign(query, { where: email });
    }

    return query;
  }
}
