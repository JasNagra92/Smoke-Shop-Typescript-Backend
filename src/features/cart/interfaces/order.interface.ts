import { IMenuItemDocumentFrontEnd, IMenuItemDocumentBackend } from './../../menu/interfaces/menu.interface';
import Stripe from 'stripe';

export interface IOrderItemFrontEnd extends IMenuItemDocumentFrontEnd {
  quantity: number;
}

export interface IOrderItemBackend extends IMenuItemDocumentBackend {
  quantity: number;
}

export interface IOrderPayload {
  name: string;
  email: string;
  phoneNumber: string;
  pickupDate: string;
  items: IOrderItemFrontEnd[];
}

export interface IOrderJob {
  name: string | null;
  email: string | null;
  checkoutSessionId: string;
  items: Stripe.LineItem[] | undefined;
  amount_total: number | null;
  pickupDate: string | null;
  orderNumber: number | null;
  orderDate: string | null;
}

export interface IOrderForDatabase extends IOrderJob {
  orderNumber: number;
  orderDate: string;
}
