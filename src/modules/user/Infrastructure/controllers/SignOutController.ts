import { Request, Response } from 'express';
import { Controller, get } from '../../../shared/Infrastructure/controllers/decorators';

@Controller()
export class SignOutController {
  @get('/signout')
  public signOut(req: Request, res: Response): void {
    try {
      req.session = null;
      res.status(200).send('You are logged out');
    } catch (error: any) {
      console.log(error);
      res.send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}