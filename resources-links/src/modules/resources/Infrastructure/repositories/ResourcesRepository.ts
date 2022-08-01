import { Database } from '../../../shared/Infrastructure/repositories/Database';
import { Resource } from '../../Domain/entities/resource.entity';
import { ResourceFilter } from '../../Domain/filters/ResourceFilter';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { PrismaResourceFilterAdapter } from '../adapters/PrismaResourceFilterAdapter';
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

  public async getAll(filter: ResourceFilter): Promise<Resource[]> {
    try {
      const adapter = new PrismaResourceFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const result = await this.prisma.resource.findMany(adapterQuery);

      if (!result) {
        return [];
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

  public async getOne(filter: ResourceFilter): Promise<Resource | undefined> {
    try {
      const adapter = new PrismaResourceFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const result = await this.prisma.resource.findMany(adapterQuery);

      if (result.length === 0) {
        return undefined;
      }

      this.prisma.$disconnect();

      return this.mapper.toDomain(result[0]);
    } catch (error: any) {
      this.prisma.$disconnect();
      throw new Error(error.message);
    }
  }

  public async update(resource: Resource): Promise<void> {
    try {
      await this.prisma.resource.update({
        where: { id: resource.id },
        data: {
          title: resource.title,
          link: resource.link,
          note: resource.note,
        },
      });

      this.prisma.$disconnect();
    } catch (error: any) {
      this.prisma.$disconnect();
      throw new Error(error.message);
    }
  }

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
