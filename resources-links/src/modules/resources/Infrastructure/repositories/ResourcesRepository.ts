import { Database } from '../../../shared/Infrastructure/repositories/Database';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { ResourceMapper } from '../mappers/ResourceMapper';

export class ResourcesRepository implements IResourcesRepository {
  protected mapper = new ResourceMapper();
  private prisma = Database.instance().connection();

  public async save(resource: Resource): Promise<void> {
    const newResource = this.mapper.toData(resource);

    await this.prisma.resource.create({ data: newResource });

    this.prisma.$disconnect();
  }

  public async getAllBy(userId: string): Promise<Resource[] | undefined> {
    const result = await this.prisma.resource.findMany({ where: { user_id: userId } });

    if (!result) {
      return undefined;
    }

    // const resources: Resource[] = [];

    // for (const resource of result) {
    //   resources.push(this.mapper.toDomain(resource));
    // }

    // return resources;
  }
}