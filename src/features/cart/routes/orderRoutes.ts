import express, { Router } from 'express';
import { Cart } from '../controllers/cart';

export class CartRoutes {
  private router: Router;
  constructor() {
    this.router = express.Router();
  }
  public routes(): Router {
    this.router.get('/order/excludedDates', Cart.prototype.getExcludedDates);

    return this.router;
  }
}

export const cartRoutes: CartRoutes = new CartRoutes();
