import { Request, Response } from 'express';

import { Controller, get, use } from '../../../shared/Infrastructure/decorators';
import { currentUser, requireAuth } from '../../../shared/Infrastructure/middlewares/auth';
import { GetAllResourcesUseCase } from '../../Application/UseCases/GetAllResourcesUseCase';
import { ResourcesRepository } from '../repositories/ResourcesRepository';

@Controller()
export class GetAllResourcesController {
  @get('/resources')
  @use(requireAuth)
  @use(currentUser)
  public async getAllResources(req: Request, res: Response): Promise<void> {
    try {
      const resourceRepository = new ResourcesRepository();

      const resources = await new GetAllResourcesUseCase(resourceRepository).execute(
        req.currentUser!.id
      );

      if (!resources) {
        res.status(200).send({});
      }

      res.status(200).send(resources);
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
