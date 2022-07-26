import { Id } from '../../../shared/Domain/vo';
import { UserFilter } from '../../../user/Domain/filters/UserFilter';

export class PrismaUserFilterAdapter {
  constructor(private filter: UserFilter) {}

  public apply(): any {
    const filters = this.filter.apply();
    const query = { include: { categories: true }, orderBy: { created_at: 'desc' }, where: {} };

    if (filters.has(UserFilter.ID_FILTER)) {
      const userId = filters.get(UserFilter.ID_FILTER) as Id;

      Object.assign(query, { where: { user_id: { equals: userId } } });
    }

    if (filters.has(UserFilter.TITLE_FILTER)) {
      const title = filters.get(UserFilter.TITLE_FILTER) as Text;
      const whereQuery = { ...query.where, title: { contains: title, mode: 'insensitive' } };

      Object.assign(query, { where: whereQuery });
    }

    return query;
  }
}
