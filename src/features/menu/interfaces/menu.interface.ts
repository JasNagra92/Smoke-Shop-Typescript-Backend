import mongoose, { Document } from 'mongoose';

export interface IMenuItemDocumentFrontEnd extends Document {
  _id: string | mongoose.Types.ObjectId;
  name: string;
  stock: number;
  description: string;
  priceStr: string;
}

export interface IMenuItemDocumentBackend extends Document {
  _id: string | mongoose.Types.ObjectId;
  name: string;
  stock: number;
  description: string;
  priceStr: string;
  price_id: string;
  price: number;
}
