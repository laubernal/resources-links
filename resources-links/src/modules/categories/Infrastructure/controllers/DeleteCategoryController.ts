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
      const { id } = req.body as { id: string };

      const categoryRepository = new CategoryRepository();

      const categoryDto = new DeleteCategoryDto(id);

      new DeleteCategoryUseCase(categoryRepository).execute(categoryDto);

      res.status(200).send('Successful delete');
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
