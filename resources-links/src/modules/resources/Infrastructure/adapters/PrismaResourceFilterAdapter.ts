import { Id } from '../../../shared/Domain/vo';
import { ResourceFilter } from '../../Domain/filters/ResourceFilter';
import { Link } from '../../Domain/vo';

export class PrismaResourceFilterAdapter {
  constructor(private filter: ResourceFilter) {}

  public apply(): any {
    const filters = this.filter.apply();
    const query: { where: {}; include?: {}; orderBy?: {} } = {
      where: {},
      include: { categories: true },
      orderBy: { created_at: 'desc' },
    };

    if (filters.has(ResourceFilter.USER_ID_FILTER)) {
      const userId = filters.get(ResourceFilter.USER_ID_FILTER) as Id;

      Object.assign(query, { where: { user_id: { equals: userId.value } } });
    }

    if (filters.has(ResourceFilter.RESOURCE_ID_FILTER)) {
      const resourceId = filters.get(ResourceFilter.RESOURCE_ID_FILTER) as Id;

      delete query.orderBy;

      Object.assign(query, { where: { id: resourceId.value } });
    }

    if (filters.has(ResourceFilter.TITLE_FILTER)) {
      const title = filters.get(ResourceFilter.TITLE_FILTER) as Text;
      const whereQuery = { ...query.where, title: { contains: title, mode: 'insensitive' } };

      Object.assign(query, { where: whereQuery });
    }

    if (filters.has(ResourceFilter.LINK_FILTER)) {
      const link = filters.get(ResourceFilter.LINK_FILTER) as Link;

      delete query.orderBy;

      Object.assign(query, { where: { link: link.value } });
    }

    return query;
  }
}
