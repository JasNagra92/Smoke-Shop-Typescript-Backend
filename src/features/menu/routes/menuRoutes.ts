import express, { Router } from 'express';
import { Menu } from '../controllers/getMenu';

export class MenuRoutes {
  private router: Router;
  constructor() {
    this.router = express.Router();
  }
  public routes(): Router {
    this.router.get('/menu', Menu.prototype.getMenu);

    return this.router;
  }
}

export const menuRoutes: MenuRoutes = new MenuRoutes();
