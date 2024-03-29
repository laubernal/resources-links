import { Ordenation } from '../../Domain/filters/Ordenation';
import { Pagination } from '../../Domain/filters/Pagination';
import { Number, Text } from '../../Domain/vo';

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

  protected ordenation(ordenation: Ordenation) {
    const ordenationFilter = ordenation.build();
    const query = {};
    const fieldFilter = ordenationFilter.get(Ordenation.FIELD_FILTER) as Text;

    if (ordenationFilter.has(Ordenation.DESC_FILTER)) {
      const order = ordenationFilter.get(Ordenation.DESC_FILTER);

      this.attachOrderByQuery(order, fieldFilter.value, query);
    }

    if (ordenationFilter.has(Ordenation.ASC_FILTER)) {
      const order = ordenationFilter.get(Ordenation.ASC_FILTER);

      this.attachOrderByQuery(order, fieldFilter.value, query);
    }

    return query;
  }

  private attachOrderByQuery(order: string, fieldFilter: string, query: {}): void {
    const orderQuery = {[fieldFilter]: order};

    Object.defineProperty(orderQuery, fieldFilter, {
      value: order,
      writable: true,
      enumerable: true,
      configurable: true,
    });

    Object.assign(query, { orderBy: orderQuery });
  }
}
