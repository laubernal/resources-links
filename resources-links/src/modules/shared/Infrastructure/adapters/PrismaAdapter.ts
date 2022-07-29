import { Pagination } from '../../Domain/filters/Pagination';

export class PrismaAdapter {
  //   protected prismaFilter = {};

  //   protected assign(filter: any): void {
  //     this.prismaFilter = Object.assign(this.prismaFilter, filter);
  //   }

  protected pagination(pagination: Pagination) {
    const paginationFilter = pagination.build();
    const query = {};

    if (paginationFilter.has(Pagination.PAGE_FILTER)) {
      const page: number = paginationFilter.get(Pagination.PAGE_FILTER);
      const perPage: number = paginationFilter.get(Pagination.PER_PAGE_FILTER);

      Object.assign(query, { skip: perPage * (page - 1) });
    }

    if (paginationFilter.has(Pagination.PER_PAGE_FILTER)) {
      const perPage: number = paginationFilter.get(Pagination.PER_PAGE_FILTER);

      Object.assign(query, { take: perPage });
    }

    return query;
  }
}
