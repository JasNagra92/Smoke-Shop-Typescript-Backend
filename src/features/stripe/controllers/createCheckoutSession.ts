import { Request, Response } from 'express';
import { config } from 'src/config';
import Stripe from 'stripe';
const stripe = new Stripe(config.STRIPE_API_KEY!, {
  apiVersion: '2022-11-15',
  typescript: true
});

class CreateCheckoutSession {
  public async create(req: Request, res: Response): Promise<void> {}
}
