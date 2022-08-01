import { Pagination } from '../../Domain/filters/Pagination';
import { Number } from '../../Domain/vo';

export class PrismaAdapter {
  protected prismaFilter = { where: {} };

  protected assign(filter: any): void {
    this.prismaFilter = Object.assign(this.prismaFilter, filter);
  }

  protected pagination(pagination: Pagination) {
    const paginationFilter = pagination.build();
    const query = {};

    if (paginationFilter.has(Pagination.PAGE_FILTER)) {
      const page = paginationFilter.get(Pagination.PAGE_FILTER) as Number;
      const perPage = paginationFilter.get(Pagination.PER_PAGE_FILTER) as Number;

      Object.assign(query, { skip: perPage.value * (page.value - 1) });
    }

    if (paginationFilter.has(Pagination.PER_PAGE_FILTER)) {
      const perPage = paginationFilter.get(Pagination.PER_PAGE_FILTER) as Number;

      Object.assign(query, { take: perPage.value });
    }

    return query;
  }
}
