import { Request, Response } from 'express';

import { bodyValidator, Controller, post } from '../../../shared/Infrastructure/decorators';
import { NewResourceUseCase } from '../../Application/UseCases/NewResourceUseCase';
import { ResourcesRepository } from '../repositories/ResourcesRepository';

@Controller()
export class NewResourceController {
  @post('/resources/new')
  @bodyValidator('title', 'note', 'link')
  public async newResource(req: Request, res: Response): Promise<void> {
    try {
      const { title, note, link, userId } = req.body;
      console.log(`TITLE - ${title} NOTE - ${note} LINK - ${link} USERID - ${userId}`);

      const resourceRepository = new ResourcesRepository();

      const resourceId = await new NewResourceUseCase(resourceRepository).execute(
        title,
        note,
        link,
        userId
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
