import { Filter } from '../../../shared/Domain/filters/Filter';
import { Ordenation } from '../../../shared/Domain/filters/Ordenation';
import { Id, Text } from '../../../shared/Domain/vo';
import { Link } from '../vo';

export class ResourceFilter extends Filter {
  public static USER_ID_FILTER = 'user_id';
  public static RESOURCE_ID_FILTER = 'id';
  public static TITLE_FILTER = 'title';
  public static LINK_FILTER = 'link';

  public static builder(): ResourceFilter {
    return new ResourceFilter();
  }

  protected data: Map<string, any> = new Map();

  public withUserId(userId: Id): this {
    this.data.set(ResourceFilter.USER_ID_FILTER, userId);
    return this;
  }

  public withResourceId(resourceId: Id): this {
    this.data.set(ResourceFilter.RESOURCE_ID_FILTER, resourceId);
    return this;
  }

  public withTitle(title: Text): this {
    this.data.set(ResourceFilter.TITLE_FILTER, title);
    return this;
  }

  public withLink(link: Link): this {
    this.data.set(ResourceFilter.LINK_FILTER, link);
    return this;
  }

  public orderByCreationDate(order: string): this {
    if (order === Ordenation.ASC_FILTER) {
      this.orderBy(new Text('created_at')).setAscOrder();
      return this;
    }

    this.orderBy(new Text('created_at')).setDescOrder();
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
