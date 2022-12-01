import { CurrentUser } from './../controllers/currentUser';
import { authMiddleware } from './../../../shared/globals/helpers/authMiddleware';
import express, { Router } from 'express';

class CurrentUserRouter {
  private router: Router;
  constructor() {
    this.router = express.Router();
  }
  public routes(): Router {
    this.router.get('/currentuser', authMiddleware.checkAuthentication, CurrentUser.prototype.read);
    return this.router;
  }
}

export const currentUserRouter: CurrentUserRouter = new CurrentUserRouter();
