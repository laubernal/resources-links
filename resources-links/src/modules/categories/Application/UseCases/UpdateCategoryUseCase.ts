import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Text } from '../../../shared/Domain/vo';
import { Category } from '../../Domain/entities/category.entity';
import { CategoryAlreadyExistsError } from '../../Domain/error';
import { ICategoryRepository } from '../../Domain/interfaces/ICategoriesRepository';
import { UpdateCategoryDto } from '../Dto/UpdateCategoryDto';

export class UpdateCategoryUseCase implements IUseCase<string> {
  constructor(public categoryRepository: ICategoryRepository) {}

  public async execute(category: UpdateCategoryDto): Promise<string> {
    try {
      await this.checkIfCategoryAlreadyExists(category.name);

      const updatedCategory = new Category(category.id, category.name);

      await this.categoryRepository.update(updatedCategory);

      return updatedCategory.id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async checkIfCategoryAlreadyExists(name: string): Promise<void> {
    const categoryExists = await this.categoryRepository.getOneByName(name);

    if (categoryExists) {
      throw new CategoryAlreadyExistsError();
    }
  }
}
