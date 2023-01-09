import { IOrderItemFrontEnd } from './../../../features/cart/interfaces/order.interface';
import { IMenuItemDocumentFrontEnd } from './../../../features/menu/interfaces/menu.interface';
import { IMenuItemDocumentBackend } from '../../../features/menu/interfaces/menu.interface';
import { MenuItemModel } from '../../../features/menu/models/menu.model';
import mongoose from 'mongoose';

class MenuItemService {
  public async getMenuItemById(_id: string | mongoose.Types.ObjectId): Promise<IMenuItemDocumentBackend> {
    const item: IMenuItemDocumentBackend = (await MenuItemModel.findById({ _id }).lean()) as IMenuItemDocumentBackend;
    return item;
  }

  public async getAllMenuItems(): Promise<IMenuItemDocumentFrontEnd[]> {
    // send all menu items price string, description, name, and _id to front end but exclude price_id to keep source of truth in backend server
    const items: IMenuItemDocumentFrontEnd[] = (await MenuItemModel.find(
      {},
      { price_id: 0, price: 0 }
    ).exec()) as IMenuItemDocumentFrontEnd[];
    return items;
  }

  public async compareOrderToInventoryStock(
    query: (string | mongoose.Types.ObjectId)[],
    cartItems: IOrderItemFrontEnd[]
  ): Promise<boolean> {
    const inventoryItems: IMenuItemDocumentBackend[] = await MenuItemModel.find({ _id: { $in: query } });

    for (const item of cartItems) {
      const inventoryItem = inventoryItems.find((element) => element.name === item.name);

      if (item.quantity > inventoryItem!.stock) {
        return true;
      }
    }

    return false;
  }
}

export const menuItemService: MenuItemService = new MenuItemService();
