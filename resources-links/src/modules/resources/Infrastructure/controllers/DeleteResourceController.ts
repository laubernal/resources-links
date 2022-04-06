import { Request, Response } from 'express';

import { bodyValidator, Controller, post } from '../../../shared/Infrastructure/decorators';
import { DeleteResourceUseCase } from '../../Application/UseCases/DeleteResourceUseCase';
import { ResourcesRepository } from '../repositories/ResourcesRepository';

@Controller()
export class DeleteResourceController {
  @post('/resources/delete')
  @bodyValidator('resourceId', 'userId')
  public async deleteResource(req: Request, res: Response): Promise<void> {
    try {
      const { resourceId, userId } = req.body;
      console.log(`DELETE CONTROLLER RESOURCE ID - ${resourceId} USER ID - ${userId}`);

      const resourceRepository = new ResourcesRepository();

      new DeleteResourceUseCase(resourceRepository).execute(resourceId, userId);

      res.status(200);
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
