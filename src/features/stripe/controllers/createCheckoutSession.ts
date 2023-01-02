import { orderServices } from './../../../shared/services/db/order.services';
import { BadRequestError } from './../../../shared/globals/helpers/errorHandler';
import { IOrderItemFrontEnd, IOrderItemBackend } from './../../cart/interfaces/order.interface';
import { menuItemService } from './../../../shared/services/db/menu.services';
import HTTP_STATUS from 'http-status-codes';
import { IOrderPayload } from '../../cart/interfaces/order.interface';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { config } from 'src/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('checkoutSessionLog');

const stripe: Stripe = new Stripe(config.STRIPE_API_KEY!, {
  apiVersion: '2022-11-15'
});

export class CheckoutSession {
  public async create(req: Request, res: Response): Promise<void> {
    const { payload }: { payload: IOrderPayload } = req.body;
    const { items }: { items: IOrderItemFrontEnd[] } = payload;

    const query = [];
    for (const item of items) {
      query.push(item._id);
    }

    const stockError = await menuItemService.compareOrderToInventoryStock(query, items);

    if (stockError) {
      log.error('not enough stock');
      throw new BadRequestError('not enough stock to complete order');
    }

    const orderedItems: IOrderItemBackend[] = await orderServices.createOrderedItems(items);

    const line_items = [];
    for (const item of orderedItems) {
      line_items.push({
        price: item.price_id,
        quantity: item.quantity
      });
    }
    const session: Stripe.Response<Stripe.Checkout.Session> = await stripe.checkout.sessions.create({
      line_items: line_items,
      customer_creation: 'always',
      customer_email: payload.email,
      metadata: {
        pickupDate: payload.pickupDate
      },
      allow_promotion_codes: true,
      mode: 'payment',
      success_url: `${config.CLIENT_URL}?success=true`,
      cancel_url: `${config.CLIENT_URL}?cancelled=true`,
      automatic_tax: { enabled: false }
    });
    log.info('checkout session created');
    res.status(HTTP_STATUS.OK).json({ url: session.url });
  }
}
