import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';

export class ResourcesRepository implements IResourcesRepository {
  // protected mapper = new ResourceMapper();
  // private prisma = Database.instance().connection();

  constructor() {}

  public async save(resource: Resource): Promise<void> {}

  public async getAllBy(value: string): Promise<Resource | undefined> {
    return new Resource('', '', '', '', '');
  }
}
