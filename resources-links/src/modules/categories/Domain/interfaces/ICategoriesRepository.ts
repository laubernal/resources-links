import { Category } from '../entities/category.entity';

export interface ICategoriesRepository {
  save(category: Category): Promise<void>;
  getAll(): Promise<Category[] | undefined>;
  update(category: Category): Promise<void>;
  delete(id: string): Promise<void>;
}
