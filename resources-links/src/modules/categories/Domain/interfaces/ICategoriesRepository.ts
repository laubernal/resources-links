import { Category } from '../entities/category.entity';

export interface ICategoryRepository {
  save(category: Category): Promise<void>;
  getOneByName(name: string): Promise<Category | undefined>;
  getAll(): Promise<Category[] | undefined>;
  update(category: Category): Promise<void>;
  delete(id: string): Promise<number | undefined>;
}
