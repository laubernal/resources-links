import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { bodyValidator, Controller, post } from '../../../shared/Infrastructure/decorators';
import { SignInDto } from '../../Application/Dto/SignInDto';
import { SignInUseCase } from '../../Application/UseCases';
import { UserRepository } from '../../Infrastructure/repositories/UserRepository';

@Controller()
export class SignInController {
  @post('/signin')
  @bodyValidator('email', 'password')
  public async signIn(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const userRepository = new UserRepository();

      const signInDto = new SignInDto(email, password);

      const user = await new SignInUseCase(userRepository).execute(signInDto);

      const userJwt = jwt.sign(
        {
          id: user.id,
          email: email,
        },
        process.env.TOKEN_KEY!
      );

      req.session = {
        jwt: userJwt,
      };

      res.status(201).send({ email, userJwt });
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
