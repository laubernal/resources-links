import { Request, Response } from 'express';

import { Controller, get, use } from '../../../shared/Infrastructure/decorators';
import { currentUser, requireAuth } from '../../../shared/Infrastructure/middlewares/auth';
import { GetAllResourcesResponse } from '../../Application/Dto';
import { GetAllResourcesUseCase } from '../../Application/UseCases';
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

      if (!resources.length) {
        res.status(200).send({});
      }

      const resourcesList = resources.map(resource => {
        const createdAt = resource.createdAt?.toDateString();
        console.log(resource.categories);

        return new GetAllResourcesResponse(
          resource.id,
          resource.title,
          resource.link,
          resource.note,
          resource.userId,
          createdAt,
          resource.categories
        );
      });

      res.status(200).send(resourcesList);
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
