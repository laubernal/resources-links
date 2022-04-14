import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Text } from '../../../shared/Domain/vo';
import { Category } from '../../Domain/entities/category.entity';
import { CategoryAlreadyExistsError } from '../../Domain/error';
import { ICategoryRepository } from '../../Domain/interfaces/ICategoriesRepository';
import { NewCategoryDto } from '../Dto/NewCategoryDto';

export class NewCategoryUseCase implements IUseCase<string> {
  constructor(public categoryRepository: ICategoryRepository) {}

  public async execute(category: NewCategoryDto): Promise<string> {
    try {
      await this.checkIfCategoryAlreadyExists(category.name);

      const newCategory = Category.build(new Text(category.name));

      console.log(newCategory);

      await this.categoryRepository.save(newCategory);

      return newCategory.id;
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
