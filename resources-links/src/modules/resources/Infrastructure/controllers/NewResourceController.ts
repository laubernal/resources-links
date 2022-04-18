import { Request, Response } from 'express';

import { bodyValidator, Controller, post, use } from '../../../shared/Infrastructure/decorators';
import { currentUser, requireAuth } from '../../../shared/Infrastructure/middlewares/auth';
import { NewResourceDto } from '../../Application/Dto';
import { NewResourceUseCase } from '../../Application/UseCases';
import { ResourcesRepository } from '../repositories/ResourcesRepository';

@Controller()
export class NewResourceController {
  @post('/resources/new')
  @use(requireAuth)
  @use(currentUser)
  @bodyValidator('title', 'note', 'link', 'categories')
  public async newResource(req: Request, res: Response): Promise<void> {
    try {
      const { title, note, link, categories } = req.body as {
        title: string;
        note: string;
        link: string;
        categories: string[];
      };

      const resourceRepository = new ResourcesRepository();

      const newResourceDto = new NewResourceDto(title, note, link, req.currentUser!.id, categories);

      const resourceId = await new NewResourceUseCase(resourceRepository).execute(newResourceDto);

      res.status(200).send({ resourceId });
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
