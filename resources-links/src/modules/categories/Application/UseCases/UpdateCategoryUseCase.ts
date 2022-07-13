import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { AlreadyExistsError } from '../../../shared/Domain/Error/AlreadyExistsError';
import { Id } from '../../../shared/Domain/vo';
import { Category } from '../../Domain/entities/category.entity';
import { ICategoryRepository } from '../../Domain/interfaces/ICategoriesRepository';
import { CategoryDto } from '../Dto/CategoryDto';

export class UpdateCategoryUseCase implements IUseCase<string> {
  constructor(public categoryRepository: ICategoryRepository) {}

  public async execute(category: CategoryDto): Promise<string> {
    try {
      const validatedId = new Id(category.id);

      await this.checkIfCategoryAlreadyExists(category.name);

      const updatedCategory = new Category(validatedId.value, category.name);

      await this.categoryRepository.update(updatedCategory);

      return updatedCategory.id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async checkIfCategoryAlreadyExists(name: string): Promise<void> {
    const categoryExists = await this.categoryRepository.getOneByName(name);

    if (categoryExists) {
      throw new AlreadyExistsError('Category already exists');
    }
  }
}
