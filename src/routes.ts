import { healthRoutes } from './features/health/routes/healthRoutes';
import { stripeRoutes } from './features/stripe/routes/stripeRoutes';
import { cartRoutes } from './features/cart/routes/orderRoutes';
import { serverAdapter } from './../src/shared/services/queue/base.queue';
import { authMiddleware } from './shared/globals/helpers/authMiddleware';
import { currentUserRouter } from './../src/features/auth/routes/currentUser.routes';
import { authRoutes } from './../src/features/auth/routes/auth.routes';
import { Application } from 'express';
import { menuRoutes } from './features/menu/routes/menuRoutes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  app.use('/health', healthRoutes.healthRoute());
  app.use('/instance', healthRoutes.instance());
  app.use('/env', healthRoutes.env());
  app.use('/queues', serverAdapter.getRouter());
  app.use('/webhook', stripeRoutes.webhookRoutes());
  app.use(BASE_PATH, authRoutes.routes());
  app.use(BASE_PATH, authRoutes.signOutRoute());

  app.use(BASE_PATH, menuRoutes.routes());
  app.use(BASE_PATH, cartRoutes.routes());
  app.use(BASE_PATH, stripeRoutes.routes());

  app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRouter.routes());
};
