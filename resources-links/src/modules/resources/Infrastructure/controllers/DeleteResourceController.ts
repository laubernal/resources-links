import { Request, Response } from 'express';

import { bodyValidator, Controller, post, use } from '../../../shared/Infrastructure/decorators';
import { currentUser, requireAuth } from '../../../shared/Infrastructure/middlewares/auth';
import { DeleteResourceDto } from '../../Application/Dto';
import { DeleteResourceUseCase } from '../../Application/UseCases';
import { ResourcesRepository } from '../repositories/ResourcesRepository';

@Controller()
export class DeleteResourceController {
  @post('/resources/delete')
  @use(requireAuth)
  @use(currentUser)
  @bodyValidator('resourceId')
  public async deleteResource(req: Request, res: Response): Promise<void> {
    try {
      const { resourceId } = req.body as { resourceId: string };

      const resourceRepository = new ResourcesRepository();

      const deleteResourceDto = new DeleteResourceDto(resourceId, req.currentUser!.id);

      new DeleteResourceUseCase(resourceRepository).execute(deleteResourceDto);

      res.status(200).send({});
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
