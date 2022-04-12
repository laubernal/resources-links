import { Prisma } from '@prisma/client';
import { IMapper } from '../../../shared/Infrastructure/mappers/IMapper';
import { Category } from '../../Domain/entities/category.entity';

export class CategoryMapper implements IMapper<Prisma.CategoryCreateInput, Category> {
  public toData(category: Category): Prisma.CategoryCreateInput {
    return {
      id: category.id,
      name: category.name,
    };
  }

  public toDomain(category: Prisma.CategoryCreateInput): Category {
    return new Category(category.id, category.name);
  }
}
