import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { SignUpUseCase } from '../../Application/UseCases';
import { UserRepository } from '../repositories/UserRepository';

export class SignUpController {
  public async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password, passwordConfirmation } = req.body;

      const userRepository = new UserRepository();

      const id = await new SignUpUseCase(userRepository).execute(
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation
      );

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
        msg: 'Error occured',
        error: error.message,
      });
    }
  }
}
