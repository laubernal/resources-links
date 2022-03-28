import express, { Router } from 'express';

export class AppRouter {
  private static instance: Router;

  public static getInstance(): Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}
