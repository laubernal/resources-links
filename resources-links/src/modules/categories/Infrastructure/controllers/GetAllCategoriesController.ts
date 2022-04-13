import { Request, Response } from 'express';
import { Controller, get, use } from '../../../shared/Infrastructure/decorators';
import { currentUser, requireAuth } from '../../../shared/Infrastructure/middlewares/auth';
import { GetAllCategoriesUseCase } from '../../Application/UseCases';
import { CategoryRepository } from '../repositories/CategoryRepository';

@Controller()
export class GetAllCategoriesController {
  @get('/categories')
  @use(requireAuth)
  @use(currentUser)
  public async execute(req: Request, res: Response) {
    try {
      const categories = await new GetAllCategoriesUseCase(new CategoryRepository()).execute();

      res.status(200).send(categories);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
