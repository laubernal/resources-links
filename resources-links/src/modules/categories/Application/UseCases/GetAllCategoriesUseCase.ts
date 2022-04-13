import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Category } from '../../Domain/entities/category.entity';
import { ICategoryRepository } from '../../Domain/interfaces/ICategoriesRepository';

export class GetAllCategoriesUseCase implements IUseCase<Category> {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute(): Promise<Category[] | undefined> {
    try {
      const categories = await this.categoryRepository.getAll();

      return categories;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
