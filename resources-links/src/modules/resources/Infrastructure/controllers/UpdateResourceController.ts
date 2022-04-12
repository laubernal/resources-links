import { Request, Response } from 'express';

import { bodyValidator, Controller, post, use } from '../../../shared/Infrastructure/decorators';
import { currentUser, requireAuth } from '../../../shared/Infrastructure/middlewares/auth';
import { UpdateResourceDto } from '../../Application/Dto';
import { UpdateResourceUseCase } from '../../Application/UseCases';
import { ResourcesRepository } from '../repositories/ResourcesRepository';

@Controller()
export class UpdateResourceController {
  @post('/resources/update')
  @use(requireAuth)
  @use(currentUser)
  @bodyValidator('id', 'title', 'note', 'link')
  public async newResource(req: Request, res: Response): Promise<void> {
    try {
      const { id, title, note, link } = req.body;

      const resourceRepository = new ResourcesRepository();

      const updateResourceDto = new UpdateResourceDto(id, title, note, link, req.currentUser!.id);

      const resourceId = await new UpdateResourceUseCase(resourceRepository).execute(
        updateResourceDto
      );

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