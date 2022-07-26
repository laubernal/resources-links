import { Database } from '../../../shared/Infrastructure/repositories/Database';
import { UserFilter } from '../../../user/Domain/filters/UserFilter';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { PrismaUserFilterAdapter } from '../adapters/PrismaUserFilterAdapter';
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

  public async getAllTest(filter: UserFilter, perPage: number, page: number): Promise<Resource[]> {
    try {
      const skip = perPage * (page - 1);
      const take = perPage;

      const adapter = new PrismaUserFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const query = Object.assign(adapterQuery, skip, take);

      const result = await this.prisma.resource.findMany(query);

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

  public async getAllByUserId(
    userId: string,
    perPage: number,
    page: number,
    search: string
  ): Promise<Resource[]> {
    try {
      const skip = perPage * (page - 1);
      const take = perPage;

      const result = await this.prisma.resource.findMany({
        skip,
        take,
        where: { user_id: { equals: userId }, title: { contains: search, mode: 'insensitive' } },
        include: { categories: true },
        orderBy: { created_at: 'desc' },
      });

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

  public async getOneByResourceId(resourceId: string): Promise<Resource> {
    try {
      const result = await this.prisma.resource.findMany({
        where: { id: resourceId },
      });

      this.prisma.$disconnect();

      return this.mapper.toDomain(result[0]);
    } catch (error: any) {
      this.prisma.$disconnect();
      throw new Error(error.message);
    }
  }

  public async getOneByLink(link: string): Promise<Resource | undefined> {
    try {
      const result = await this.prisma.resource.findMany({
        where: { link },
      });

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
