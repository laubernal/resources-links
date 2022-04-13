import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { DeleteError } from '../../../shared/Domain/Error/DeleteError';
import { Id } from '../../../shared/Domain/vo';
import { ICategoryRepository } from '../../Domain/interfaces/ICategoriesRepository';
import { DeleteCategoryDto } from '../Dto';

export class DeleteCategoryUseCase implements IUseCase<void> {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute(category: DeleteCategoryDto): Promise<void> {
    try {
      const validatedCategoryId = Id.validUuid(category.id);

      const deletedCategory = await this.categoryRepository.delete(validatedCategoryId);

      if (!deletedCategory) {
        throw new DeleteError('Could not delete category');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
