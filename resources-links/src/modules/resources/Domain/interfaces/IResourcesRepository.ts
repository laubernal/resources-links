import { Resource } from '../entities/resource.entity';

export interface IResourcesRepository {
  save(resource: Resource): Promise<void>;
  getAllByUserId(userId: string): Promise<Resource[] | undefined>;
  getOneByLink(link: string): Promise<Resource | undefined>;
  delete(resourceId: string, userId: string): Promise<number | undefined>;
}
