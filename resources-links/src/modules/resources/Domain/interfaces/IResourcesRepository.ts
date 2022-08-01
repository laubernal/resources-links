import { Resource } from '../entities/resource.entity';
import { ResourceFilter } from '../filters/ResourceFilter';

export interface IResourcesRepository {
  save(resource: Resource): Promise<void>;
  getAll(filter: ResourceFilter): Promise<Resource[]>;
  getOne(filter: ResourceFilter): Promise<Resource | undefined>;
  update(resource: Resource): Promise<void>;
  delete(resourceId: string, userId: string): Promise<number | undefined>;
}
