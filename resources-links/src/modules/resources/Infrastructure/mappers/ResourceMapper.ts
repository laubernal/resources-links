import { Prisma } from '@prisma/client';

import { IMapper } from '../../../shared/Infrastructure/mappers/IMapper';
import { Resource } from '../../Domain/entities/resource.entity';

export class ResourceMapper implements IMapper<Prisma.ResourceCreateInput, Resource> {
  public toData(resource: Resource): Prisma.ResourceCreateInput {
    return {
      id: resource.id,
      title: resource.title,
      link: resource.link,
      note: resource.note,
      user: { connect: { id: resource.userId } },
    };
  }

  public toDomain(resource: Prisma.ResourceCreateInput): Resource {
    return new Resource(
      resource.id,
      resource.title,
      resource.link,
      resource.note,
      resource.user.connect?.id as string,
      resource.created_at as Date,
      resource.updated_at as Date
    );
  }
}
