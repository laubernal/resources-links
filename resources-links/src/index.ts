require('dotenv').config();
import cookieSession from 'cookie-session';
import express, { Application } from 'express';

import { AppRouter } from './modules/shared/Infrastructure/controllers/AppRouter';
import { errorHandler } from './modules/shared/Infrastructure/middlewares/error-handler';
import './modules/user/Infrastructure/controllers';
import './modules/resources/Infrastructure/controllers';
import './modules/categories/Infrastructure/controllers';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({ name: 'resources-links-session', maxAge: 24 * 60 * 60 * 1000, signed: false })
);
app.use(AppRouter.getInstance());
app.use(errorHandler);

try {
  app.listen(port, () => {
    console.log(`✔ Connected successfully to port: ${port}`);
  });
} catch (error: any) {
  console.error(`❌ Error occurred: ${error.message}`);
}
