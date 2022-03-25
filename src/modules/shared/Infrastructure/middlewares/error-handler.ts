import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../Domain/Error/CustomError';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(chalk.red.bold(`> Controlled Application Error: ${error.message}`));
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({ errors: error.serialize() });
  }

  console.log(chalk.red.bold(`> Unexpected Application ${error.stack}`));
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
