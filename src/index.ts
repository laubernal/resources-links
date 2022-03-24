require('dotenv').config();
import cookieSession from 'cookie-session';
import express, { Application } from 'express';

import { AppRouter } from './modules/shared/Infrastructure/controllers/AppRouter';

import './modules/user/Infrastructure/controllers/SignInController'

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ name: 'session', signed: false }));
app.use(AppRouter.getInstance());

try {
  app.listen(port, () => {
    console.log(`Connected successfully to port: ${port}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
