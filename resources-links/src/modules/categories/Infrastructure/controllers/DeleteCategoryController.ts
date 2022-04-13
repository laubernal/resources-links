import { Request, Response } from 'express';
import { bodyValidator, Controller, post, use } from '../../../shared/Infrastructure/decorators';
import { currentUser, requireAuth } from '../../../shared/Infrastructure/middlewares/auth';
import { DeleteCategoryDto } from '../../Application/Dto';
import { DeleteCategoryUseCase } from '../../Application/UseCases';
import { CategoryRepository } from '../repositories/CategoryRepository';

@Controller()
export class DeleteCategoryController {
  @post('/categories/delete')
  @use(requireAuth)
  @use(currentUser)
  @bodyValidator('id')
  public async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id, name } = req.body as { id: string; name: string };

      const categoryRepository = new CategoryRepository();

      const categoryDto = new DeleteCategoryDto(id, name);

      new DeleteCategoryUseCase(categoryRepository).execute(categoryDto);
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
