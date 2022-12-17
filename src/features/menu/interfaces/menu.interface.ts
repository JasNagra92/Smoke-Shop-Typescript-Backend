import { Document } from 'mongoose';

export interface IMenuItemDocument extends Document {
  name: string;
  price: number;
  price_id: string;
  stock: number;
  description: string;
  priceStr: string;
}
