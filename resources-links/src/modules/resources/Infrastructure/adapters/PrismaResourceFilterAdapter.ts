import { Id } from '../../../shared/Domain/vo';
import { ResourceFilter } from '../../Domain/filters/ResourceFilter';

export class PrismaResourceFilterAdapter {
  constructor(private filter: ResourceFilter) {}

  public apply(): any {
    const filters = this.filter.apply();
    const query = { include: { categories: true }, orderBy: { created_at: 'desc' }, where: {} };

    if (filters.has(ResourceFilter.RESOURCE_ID_FILTER)) {
      const userId = filters.get(ResourceFilter.RESOURCE_ID_FILTER) as Id;

      Object.assign(query, { where: { user_id: { equals: userId } } });
    }

    // if (filters.has(ResourceFilter.TITLE_FILTER)) {
    //   const title = filters.get(ResourceFilter.TITLE_FILTER) as Text;
    //   const whereQuery = { ...query.where, title: { contains: title, mode: 'insensitive' } };

    //   Object.assign(query, { where: whereQuery });
    // }

    return query;
  }
}
