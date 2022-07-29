import { Pagination } from '../../../shared/Domain/filters/Pagination';
import { Id, Text } from '../../../shared/Domain/vo';
import { PrismaAdapter } from '../../../shared/Infrastructure/adapters/PrismaAdapter';
import { ResourceFilter } from '../../Domain/filters/ResourceFilter';
import { Link } from '../../Domain/vo';

type queryType = { where: {}; include: {}; orderBy?: {} };

export class PrismaResourceFilterAdapter extends PrismaAdapter {
  constructor(private filter: ResourceFilter) {
    super();
  }

  public apply(): any {
    const filters = this.filter.apply();

    const query: queryType = {
      where: {},
      include: { categories: true },
      orderBy: { created_at: 'desc' },
    };

    if (filters.has(ResourceFilter.USER_ID_FILTER)) {
      const userId = filters.get(ResourceFilter.USER_ID_FILTER) as Id;
      const whereQuery = { ...query.where, user_id: { equals: userId.value } };

      Object.assign(query, { where: whereQuery });
    }

    if (filters.has(ResourceFilter.RESOURCE_ID_FILTER)) {
      const resourceId = filters.get(ResourceFilter.RESOURCE_ID_FILTER) as Id;
      const whereQuery = { ...query.where, id: resourceId.value };

      delete query.orderBy;

      Object.assign(query, { where: whereQuery });
    }

    if (filters.has(ResourceFilter.TITLE_FILTER)) {
      const title = filters.get(ResourceFilter.TITLE_FILTER) as Text;
      const whereQuery = {
        ...query.where,
        title: { contains: title, mode: 'insensitive' },
      };

      Object.assign(query, { where: whereQuery });
    }

    if (filters.has(ResourceFilter.LINK_FILTER)) {
      const link = filters.get(ResourceFilter.LINK_FILTER) as Link;
      const whereQuery = { ...query.where, link: link.value };

      delete query.orderBy;

      Object.assign(query, { where: whereQuery });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      // this.assign(this.pagination(pagination));
      // Object.assign(query, this.pagination(pagination));
    }

    // return this.prismaFilter;
    return query;
  }
}
