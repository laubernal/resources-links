import { Ordenation } from '../../../shared/Domain/filters/Ordenation';
import { Pagination } from '../../../shared/Domain/filters/Pagination';
import { Id, Text } from '../../../shared/Domain/vo';
import { PrismaAdapter } from '../../../shared/Infrastructure/adapters/PrismaAdapter';
import { ResourceFilter } from '../../Domain/filters/ResourceFilter';
import { Link } from '../../Domain/vo';

type queryType = { include: {} };

export class PrismaResourceFilterAdapter extends PrismaAdapter {
  constructor(private filter: ResourceFilter) {
    super();
  }

  public apply(): any {
    const filters = this.filter.apply();

    const query: queryType = {
      include: { categories: true },
    };

    this.assign(query);

    if (filters.has(ResourceFilter.USER_ID_FILTER)) {
      const userId = filters.get(ResourceFilter.USER_ID_FILTER) as Id;
      const whereQuery = { ...this.prismaFilter.where, user_id: { equals: userId.value } };

      this.assign({ where: whereQuery });
    }

    if (filters.has(ResourceFilter.RESOURCE_ID_FILTER)) {
      const resourceId = filters.get(ResourceFilter.RESOURCE_ID_FILTER) as Id;
      const whereQuery = { ...this.prismaFilter.where, id: resourceId.value };

      this.assign({ where: whereQuery });
    }

    if (filters.has(ResourceFilter.TITLE_FILTER)) {
      const title = filters.get(ResourceFilter.TITLE_FILTER) as Text;
      const whereQuery = {
        ...this.prismaFilter.where,
        title: { contains: title.value, mode: 'insensitive' },
      };

      this.assign({ where: whereQuery });
    }

    if (filters.has(ResourceFilter.LINK_FILTER)) {
      const link = filters.get(ResourceFilter.LINK_FILTER) as Link;
      const whereQuery = { ...this.prismaFilter.where, link: link.value };

      this.assign({ where: whereQuery });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.assign(this.pagination(pagination));
    }

    if (filters.has(Ordenation.ORDENATION_FILTER)) {
      const ordenation = filters.get(Ordenation.ORDENATION_FILTER);

      this.assign(this.ordenation(ordenation));
    }

    return this.prismaFilter;
  }
}
