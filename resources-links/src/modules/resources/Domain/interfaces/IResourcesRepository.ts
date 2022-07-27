import { Resource } from '../entities/resource.entity';
import { ResourceFilter } from '../filters/ResourceFilter';

export interface IResourcesRepository {
  save(resource: Resource): Promise<void>;
  getAll(filter: ResourceFilter, perPage: number, page: number): Promise<Resource[]>;
  // getAllByUserId(
  //   userId: string,
  //   perPage: number,
  //   page: number,
  //   search: string | undefined
  // ): Promise<Resource[]>;
  getOne(filter: ResourceFilter): Promise<Resource | undefined>;
  // getOneByResourceId(resourceId: string): Promise<Resource>;
  // getOneByLink(link: string): Promise<Resource | undefined>;
  update(resource: Resource): Promise<void>;
  delete(resourceId: string, userId: string): Promise<number | undefined>;
}
