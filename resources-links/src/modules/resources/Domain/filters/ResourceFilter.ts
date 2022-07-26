import { Filter } from '../../../shared/Domain/filters/Filter';
import { Id } from '../../../shared/Domain/vo';
import { Link } from '../vo';

export class ResourceFilter extends Filter {
  public static RESOURCE_ID_FILTER = 'id';
  public static LINK_FILTER = 'link';

  public static builder(): ResourceFilter {
    return new ResourceFilter();
  }

  protected data: Map<string, any> = new Map();

  public withResourceId(resourceId: Id): this {
    this.data.set(ResourceFilter.RESOURCE_ID_FILTER, resourceId);
    return this;
  }

  public withLink(link: Link): this {
    this.data.set(ResourceFilter.LINK_FILTER, link);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
