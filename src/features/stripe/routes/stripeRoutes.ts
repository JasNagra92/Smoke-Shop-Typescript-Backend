import { Webhook } from './../controllers/webhook';
import { CheckoutSession } from './../controllers/createCheckoutSession';
import express, { Router } from 'express';

export class StripeRoutes {
  private router: Router;
  constructor() {
    this.router = express.Router();
  }
  public routes(): Router {
    this.router.post('/create-checkout-session', CheckoutSession.prototype.create);

    return this.router;
  }
  public webhookRoutes(): Router {
    this.router.post('/', express.raw({ type: 'application/json' }), Webhook.prototype.handleSuccessfulPayment);

    return this.router;
  }
}

export const stripeRoutes: StripeRoutes = new StripeRoutes();
