import { Pagination } from './Pagination';

export abstract class Filter {
  protected abstract data: Map<string, any>;

  public paginate(): this {
    const pagination = new Pagination();

    this.data.set(Pagination.PAGINATION_FILTER, pagination);

    return this;
  }

  public abstract apply(): Map<string, any>;

  public setPage(page: number): this {
    this.data.set(Pagination.PAGE_FILTER, page);

    return this;
  }

  public setPerPage(perPage: number): this {
    this.data.set(Pagination.PER_PAGE_FILTER, perPage);
    return this;
  }
}
