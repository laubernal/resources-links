import { Request, Response } from 'express';
import { bodyValidator, Controller, post, use } from '../../../shared/Infrastructure/decorators';
import { requireAuth } from '../../../shared/Infrastructure/middlewares/auth';
import { UpdateCategoryDto } from '../../Application/Dto/UpdateCategoryDto';
import { UpdateCategoryUseCase } from '../../Application/UseCases';
import { CategoryRepository } from '../repositories/CategoryRepository';

@Controller()
export class UpdateCategoryController {
  @post('/categories/update')
  @use(requireAuth)
  @bodyValidator('id', 'name')
  public async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id, name } = req.body as { id: string; name: string };

      const categoryRepository = new CategoryRepository();

      const updatedCategory = new UpdateCategoryDto(id, name);

      const categoryId = await new UpdateCategoryUseCase(categoryRepository).execute(
        updatedCategory
      );

      res.status(200).send(categoryId);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
