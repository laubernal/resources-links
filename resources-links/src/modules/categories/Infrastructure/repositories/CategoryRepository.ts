import { Database } from '../../../shared/Infrastructure/repositories/Database';
import { Category } from '../../Domain/entities/category.entity';
import { ICategoryRepository } from '../../Domain/interfaces/ICategoriesRepository';
import { CategoryMapper } from '../mappers/CategoryMapper';

export class CategoryRepository implements ICategoryRepository {
  protected mapper = new CategoryMapper();
  private prisma = Database.instance().connection();

  public async save(category: Category): Promise<void> {
    try {
      const newCategory = this.mapper.toData(category);

      const result = await this.prisma.category.create({ data: newCategory });

      this.prisma.$disconnect();
    } catch (error: any) {
      this.prisma.$disconnect();
      throw new Error(error.message);
    }
  }

  public async getOneByName(name: string): Promise<Category> {
    try {
      const result = await this.prisma.category.findMany({ where: { name } });

      this.prisma.$disconnect();

      return this.mapper.toDomain(result[0]);
    } catch (error: any) {
      this.prisma.$disconnect();
      throw new Error(error.message);
    }
  }

  public async getAll(): Promise<Category[] | undefined> {
    try {
      const result = await this.prisma.category.findMany();

      if (result.length === 0) {
        return undefined;
      }

      const categories: Category[] = [];

      for (const category of result) {
        categories.push(this.mapper.toDomain(category));
      }

      this.prisma.$disconnect();

      return categories;
    } catch (error: any) {
      this.prisma.$disconnect();
      throw new Error(error.message);
    }
  }

  public async update(category: Category): Promise<void> {
    try {
      await this.prisma.category.update({
        where: { id: category.id },
        data: {
          name: category.name,
        },
      });

      this.prisma.$disconnect();
    } catch (error: any) {
      this.prisma.$disconnect();
      throw new Error(error.message);
    }
  }

  public async delete(id: string): Promise<number | undefined> {
    try {
      const result = await this.prisma.category.deleteMany({ where: { id } });

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
