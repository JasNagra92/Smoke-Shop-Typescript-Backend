/// <reference types="stripe-event-types" />
import { emailQueue } from './../../../shared/services/queue/email.queue';
import { orderQueue } from './../../../shared/services/queue/order.queue';
/* eslint-disable no-unsafe-optional-chaining */
import { Request, Response } from 'express';
import { config } from '../../../config';
import Logger from 'bunyan';
import Stripe from 'stripe';
import { Helpers } from '../../../shared/globals/helpers/helpers';
import { formatInTimeZone } from 'date-fns-tz';

const endpointSecret: string = config.STRIPE_ENDPOINT_SECRET!;

const log: Logger = config.createLogger('webhookLog');

const stripe: Stripe = new Stripe(config.STRIPE_API_KEY!, {
  apiVersion: '2022-11-15'
});

export class Webhook {
  public async handleSuccessfulPayment(req: Request, res: Response): Promise<void> {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret) as Stripe.DiscriminatedEvent;
    } catch (err: any) {
      log.error('error creating stripe event');
      res.status(400).json({ message: `Webhook Error: ${err.message}` });
    }

    if (event?.type === 'checkout.session.completed') {
      const { id, amount_total } = event.data.object;
      const { name, email } = event.data.object.customer_details as Stripe.Checkout.Session.CustomerDetails;
      const pickupDate = event.data.object.metadata;

      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(id, {
        expand: ['line_items']
      });
      const lineItems = sessionWithLineItems.line_items;

      const orderNumber = await Helpers.createOrderNumber();
      const today = formatInTimeZone(new Date(Date.now()), 'Canada/Pacific', 'MM/dd/yyyy H:mm');

      orderQueue.addOrderJob('addOrderToDB', {
        checkoutSessionId: id,
        name,
        email,
        amount_total,
        pickupDate: `${pickupDate!.pickupDate}`,
        items: lineItems?.data,
        orderNumber,
        orderDate: today
      });

      emailQueue.addJob('sendReceiptEmail', { name, email, orderNumber, pickupDate: `${pickupDate!.pickupDate}`, amount_total });

      res.status(200).end();
    } else {
      log.info(event?.type);
      res.status(200).end();
    }
  }
}
