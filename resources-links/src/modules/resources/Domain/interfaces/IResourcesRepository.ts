import { Resource } from '../entities/resource.entity';

export interface IResourcesRepository {
  save(resource: Resource): Promise<void>;
  getAllByUserId(userId: string): Promise<Resource[] | undefined>;
  getOneByResourceId(resourceId: string): Promise<Resource>;
  getOneByLink(link: string): Promise<Resource | undefined>;
  update(resource: Resource): Promise<void>;
  delete(resourceId: string, userId: string): Promise<number | undefined>;
}
