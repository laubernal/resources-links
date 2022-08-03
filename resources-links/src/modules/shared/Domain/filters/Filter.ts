import { Number, Text } from '../vo';
import { Ordenation } from './Ordenation';
import { Pagination } from './Pagination';

export abstract class Filter {
  protected abstract data: Map<string, any>;

  public paginate(): this {
    const pagination = new Pagination();

    this.data.set(Pagination.PAGINATION_FILTER, pagination);

    return this;
  }

  public order(): this {
    const ordenation = new Ordenation();

    this.data.set(Ordenation.ORDENATION_FILTER, ordenation);

    return this;
  }

  public abstract apply(): Map<string, any>;

  public setPage(page: Number): this {
    const pagination = this.data.get(Pagination.PAGINATION_FILTER);

    pagination.setPage(page);

    return this;
  }

  public setPerPage(perPage: Number): this {
    const pagination = this.data.get(Pagination.PAGINATION_FILTER);

    pagination.setPerPage(perPage);

    return this;
  }

  public setField(field: Text): this {
    const ordenation = this.data.get(Ordenation.ORDENATION_FILTER);

    ordenation.setField(field);

    return this;
  }

  public setDescOrder(): this {
    const ordenation = this.data.get(Ordenation.DESC_FILTER);

    console.log('desc order', ordenation);

    ordenation.setDescOrder();

    return this;
  }
}
