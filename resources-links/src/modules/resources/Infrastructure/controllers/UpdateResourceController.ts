import { Request, Response } from 'express';

import { bodyValidator, Controller, post, use } from '../../../shared/Infrastructure/decorators';
import { currentUser, requireAuth } from '../../../shared/Infrastructure/middlewares/auth';

@Controller()
export class UpdateResourceController {
  @post('/resources/update')
  @use(requireAuth)
  @use(currentUser)
  @bodyValidator('id', 'title', 'note', 'link')
  public async newResource(req: Request, res: Response): Promise<void> {
    try {
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
