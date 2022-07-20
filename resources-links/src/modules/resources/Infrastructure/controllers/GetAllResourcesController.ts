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
      const itemsPerPage = 3;
      const page = 1;
      const skip = itemsPerPage * (page - 1);
      const take = itemsPerPage;

      const resourcesRepository = new ResourcesRepository();

      const resources = await new GetAllResourcesUseCase(resourcesRepository).execute(
        req.currentUser!.id,
        skip,
        take
      );

      if (!resources.length) {
        res.status(200).send({});
      }

      const resourcesList = resources.map(resource => {
        const createdAt = resource.createdAt?.toDateString();
        const categories = resource.categories.map(category => {
          return { id: category.id, name: category.name };
        });

        return new GetAllResourcesResponse(
          resource.id,
          resource.title,
          resource.link,
          resource.note,
          resource.userId,
          createdAt,
          categories
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
