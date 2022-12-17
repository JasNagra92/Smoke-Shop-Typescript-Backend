import { IMenuItemDocument } from './../interfaces/menu.interface';
import { model, Model, Schema } from 'mongoose';

const menuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  price_id: { type: String, required: true },
  stock: { type: Number, required: true },
  description: { String, required: true }
});

export const MenuItemModel: Model<IMenuItemDocument> = model<IMenuItemDocument>('menuItems', menuItemSchema, 'menuItems');
