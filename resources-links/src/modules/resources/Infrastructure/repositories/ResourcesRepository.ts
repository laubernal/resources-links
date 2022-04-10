import { Database } from '../../../shared/Infrastructure/repositories/Database';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { ResourceMapper } from '../mappers/ResourceMapper';

export class ResourcesRepository implements IResourcesRepository {
  protected mapper = new ResourceMapper();
  private prisma = Database.instance().connection();

  public async save(resource: Resource): Promise<void> {
    try {
      const newResource = this.mapper.toData(resource);

      await this.prisma.resource.create({ data: newResource });

      this.prisma.$disconnect();
    } catch (error: any) {
      this.prisma.$disconnect();
      throw new Error(error.message);
    }
  }

  public async getAllByUserId(userId: string): Promise<Resource[] | undefined> {
    try {
      const result = await this.prisma.resource.findMany({ where: { user_id: userId } });

      if (!result) {
        return undefined;
      }

      const resources: Resource[] = [];

      for (const resource of result) {
        resources.push(this.mapper.toDomain(resource));
      }

      this.prisma.$disconnect();
      return resources;
    } catch (error: any) {
      this.prisma.$disconnect();
      throw new Error(error.message);
    }
  }

  public async getOneByLink(link: string): Promise<void> {}

  public async delete(resourceId: string, userId: string): Promise<number | undefined> {
    try {
      const result = await this.prisma.resource.deleteMany({
        where: { id: resourceId, user_id: userId },
      });

      if (result.count === 0) {
        return undefined;
      }

      this.prisma.$disconnect();

      return result.count;
    } catch (error: any) {
      this.prisma.$disconnect();
      throw new Error(error.message);
    }
  }
}
