import { authMiddleware } from './shared/globals/helpers/authMiddleware';
import { currentUserRouter } from './features/auth/routes/currentUser.routes';
import { authRoutes } from './features/auth/routes/auth.routes';
import { Application } from 'express';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, authRoutes.signOutRoute());

    app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRouter.routes());
  };
  routes();
};
