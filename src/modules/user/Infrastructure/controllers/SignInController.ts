import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { SignInUseCase } from '../../Application/UseCases/SignIn.useCase';
import { UserRepository } from '../../Infrastructure/repositories/UserRepository';

export class SignInController {
  public async signIn(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const userRepository = new UserRepository();

      await new SignInUseCase(userRepository).execute(email, password);

      const id = await userRepository.getId(email);

      const userJwt = jwt.sign(
        {
          id: id,
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
      res.send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
