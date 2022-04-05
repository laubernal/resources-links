import { Resource } from '../entities/resource.entity';

export interface IResourcesRepository {
  save(resource: Resource): Promise<void>;
  getAllBy(value: string): Promise<Resource[] | undefined>;
}
