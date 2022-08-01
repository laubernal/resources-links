import { Number } from '../vo';
import { Pagination } from './Pagination';

export abstract class Filter {
  protected abstract data: Map<string, any>;

  public paginate(): this {
    const pagination = new Pagination();

    this.data.set(Pagination.PAGINATION_FILTER, pagination);

    return this;
  }

  public abstract apply(): Map<string, any>;

  public setPage(page: Number): this {
    // this.data.set(Pagination.PAGE_FILTER, page);
    // return this;

    const pagination = this.data.get(Pagination.PAGINATION_FILTER);
    pagination.setPage(page);
    return this;
  }

  public setPerPage(perPage: Number): this {
    // this.data.set(Pagination.PER_PAGE_FILTER, perPage);
    // return this;

    const pagination = this.data.get(Pagination.PAGINATION_FILTER);
    pagination.setPerPage(perPage);
    return this;
  }
}
