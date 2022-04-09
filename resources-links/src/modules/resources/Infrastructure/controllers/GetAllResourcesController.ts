import { Request, Response } from 'express';

import { Controller, get } from '../../../shared/Infrastructure/decorators';
import { GetAllResourcesUseCase } from '../../Application/UseCases/GetAllResourcesUseCase';
import { ResourcesRepository } from '../repositories/ResourcesRepository';

@Controller()
export class GetAllResourcesController {
  @get('/resources')
  public async getAllResources(req: Request, res: Response): Promise<void> {
    try {
      const resourceRepository = new ResourcesRepository();

      new GetAllResourcesUseCase(resourceRepository).execute();
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
