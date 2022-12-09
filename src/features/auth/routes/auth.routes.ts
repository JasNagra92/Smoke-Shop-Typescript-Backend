import express, { Router } from 'express';
import { SignUp } from '../controllers/signup';
import { SignOut } from '../controllers/signout';
import { SignIn } from '../controllers/signin';
import { Password } from '../controllers/password';

class AuthRoutes {
  private router: Router;
  constructor() {
    this.router = express.Router();
  }
  public routes(): Router {
    this.router.post('/signup', SignUp.prototype.create);
    this.router.post('/signin', SignIn.prototype.verify);
    this.router.post('/forgotPassword', Password.prototype.forgotPassword);
    this.router.post('/resetPassword/:token', Password.prototype.resetPassword);

    return this.router;
  }
  public signOutRoute(): Router {
    this.router.get('/signout', SignOut.prototype.update);

    return this.router;
  }
}
export const authRoutes: AuthRoutes = new AuthRoutes();
