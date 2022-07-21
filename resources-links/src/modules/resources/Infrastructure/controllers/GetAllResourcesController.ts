import { Request, Response } from 'express';

import { Controller, get, use } from '../../../shared/Infrastructure/decorators';
import { currentUser, requireAuth } from '../../../shared/Infrastructure/middlewares/auth';
import { GetAllResourcesResponse } from '../../Application/Dto';
import { GetAllResourcesDto } from '../../Application/Dto/GetAllResourcesDto';
import { GetAllResourcesUseCase } from '../../Application/UseCases';
import { ResourcesRepository } from '../repositories/ResourcesRepository';

@Controller()
export class GetAllResourcesController {
  @get('/resources')
  @use(requireAuth)
  @use(currentUser)
  public async getAllResources(req: Request, res: Response): Promise<void> {
    try {
      const itemsPerPage = !req.query.perPage ? 10 : parseInt(req.query.perPage as string);
      const page: number = !req.query.page ? 1 : parseInt(req.query.page as string);
      const search = !req.query.search ? undefined : (req.query.search as string);

      const getAllResourcesDto = new GetAllResourcesDto(
        req.currentUser!.id,
        itemsPerPage,
        page,
        search
      );

      const resourcesRepository = new ResourcesRepository();

      const resources = await new GetAllResourcesUseCase(resourcesRepository).execute(
        getAllResourcesDto
      );

      if (!resources.length) {
        res.status(200).send({});
        return;
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
