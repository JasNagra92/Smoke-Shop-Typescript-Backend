import { serverAdapter } from './../src/shared/services/queue/base.queue';
import { authMiddleware } from './shared/globals/helpers/authMiddleware';
import { currentUserRouter } from './../src/features/auth/routes/currentUser.routes';
import { authRoutes } from './../src/features/auth/routes/auth.routes';
import { Application } from 'express';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  app.use('/queues', serverAdapter.getRouter());
  app.use(BASE_PATH, authRoutes.routes());
  app.use(BASE_PATH, authRoutes.signOutRoute());

  app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRouter.routes());
};
