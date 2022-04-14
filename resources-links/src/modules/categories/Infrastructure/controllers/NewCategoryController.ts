import { Request, Response } from 'express';

import { bodyValidator, Controller, post, use } from '../../../shared/Infrastructure/decorators';
import { currentUser, requireAuth } from '../../../shared/Infrastructure/middlewares/auth';
import { NewCategoryDto } from '../../Application/Dto/NewCategoryDto';
import { NewCategoryUseCase } from '../../Application/UseCases';
import { CategoryRepository } from '../repositories/CategoryRepository';

@Controller()
export class NewCategoryController {
  @post('/categories/new')
  @use(requireAuth)
  @use(currentUser)
  @bodyValidator('name')
  public async execute(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;

      const categoryRepository = new CategoryRepository();

      const newCategoryDto = new NewCategoryDto(name);

      const categoryId = await new NewCategoryUseCase(categoryRepository).execute(newCategoryDto);

      res.status(200).send({ categoryId });
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
