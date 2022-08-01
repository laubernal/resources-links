import { Number } from '../vo';

export class Pagination {
  public static PAGE_FILTER = 'page';
  public static PER_PAGE_FILTER = 'perPage';
  public static PAGINATION_FILTER = 'pagination';

  private pagination: Map<string, any> = new Map();

  public setPage(page: Number): this {
    this.pagination.set(Pagination.PAGE_FILTER, page);
    return this;
  }

  public setPerPage(perPage: Number): this {
    this.pagination.set(Pagination.PER_PAGE_FILTER, perPage);
    return this;
  }

  public build(): Map<string, any> {
    return this.pagination;
  }
}
