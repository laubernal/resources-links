import { Prisma } from '@prisma/client';

import { IMapper } from '../../../shared/Infrastructure/mappers/IMapper';
import { Resource } from '../../Domain/entities/resource.entity';
import { CategoryVo } from '../../Domain/vo';

export class ResourceMapper implements IMapper<Prisma.ResourceCreateInput, Resource> {
  public toData(resource: Resource): Prisma.ResourceCreateInput {
    const categories = resource.categories.map(category => {
      return { id: category.id };
    });

    return {
      id: resource.id,
      title: resource.title,
      link: resource.link,
      note: resource.note,
      user: { connect: { id: resource.userId } },
      categories: { connect: categories },
    };
  }

  public toDomain(resource: any): Resource {
    const categories = resource.categories.map((category: any) => {
      return new CategoryVo(category.id, category.name);
    });

    return new Resource(
      resource.id,
      resource.title,
      resource.link,
      resource.note,
      resource.user_id,
      categories,
      resource.created_at as Date,
      resource.updated_at as Date
    );;
  }
}
