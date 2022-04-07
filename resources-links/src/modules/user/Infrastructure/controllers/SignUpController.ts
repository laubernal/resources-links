import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { bodyValidator, Controller, post } from '../../../shared/Infrastructure/decorators';
import { SignUpDto } from '../../Application/Dto';
import { SignUpUseCase } from '../../Application/UseCases';
import { UserRepository } from '../repositories/UserRepository';

@Controller()
export class SignUpController {
  @post('/signup')
  @bodyValidator('firstName', 'lastName', 'email', 'password', 'passwordConfirmation')
  public async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password, passwordConfirmation } = req.body;

      const userRepository = new UserRepository();

      const signUpDto = new SignUpDto(firstName, lastName, email, password, passwordConfirmation);

      const id = await new SignUpUseCase(userRepository).execute(signUpDto);

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
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
