import { authRoutes } from './features/auth/routes/auth.routes';
import { Application } from 'express';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  app.use(BASE_PATH, authRoutes.routes());
  app.use(BASE_PATH, authRoutes.signOutRoute());
};
