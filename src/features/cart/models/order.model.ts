import { model, Model, Schema } from 'mongoose';
import { IOrderForDatabase } from '../interfaces/order.interface';

const orderSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  checkoutSessionId: { type: String, required: true },
  items: { type: Array, required: true },
  amount_total: { type: Number, required: true },
  orderNumber: { type: Number, required: true },
  pickupDate: { type: String, required: true },
  orderDate: { type: String, required: true }
});

export const orderModel: Model<IOrderForDatabase> = model<IOrderForDatabase>('orders', orderSchema, 'orders');
