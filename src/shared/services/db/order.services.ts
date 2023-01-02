import { IOrderItemBackend, IOrderItemFrontEnd } from './../../../features/cart/interfaces/order.interface';
import { orderModel } from '../../../features/cart/models/order.model';
import { Stripe } from 'stripe';
import { IOrderForDatabase } from '../../../features/cart/interfaces/order.interface';
import { IMenuItemDocumentBackend } from 'src/features/menu/interfaces/menu.interface';
import { menuItemService } from './menu.services';

class OrderServices {
  public async saveOrderToDB(
    name: string,
    email: string,
    checkoutSessionId: string,
    items: Stripe.LineItem[],
    pickupDate: string,
    amount_total: number,
    orderNumber: number,
    orderDate: string
  ): Promise<void> {
    const order: IOrderForDatabase = {
      name,
      email,
      checkoutSessionId,
      pickupDate,
      items,
      amount_total,
      orderNumber,
      orderDate
    };
    await orderModel.create(order);
  }
  public async getExcludedDates(): Promise<string[]> {
    const dates = await orderModel.find({}, { pickupDate: 1 });
    const data: string[] = [];
    for (const item of dates) {
      data.push(item.pickupDate!);
    }
    const formattedDates = data.map((date) => {
      return date.slice(0, 10).replace(/-/g, ',');
    });
    return formattedDates;
  }
  public async createOrderedItems(items: IOrderItemFrontEnd[]): Promise<IOrderItemBackend[]> {
    const orderedItems: IOrderItemBackend[] = [];

    for (const item of items) {
      const menuItem: IMenuItemDocumentBackend = await menuItemService.getMenuItemById(item._id);
      const orderedItem: IOrderItemBackend = { ...menuItem, quantity: item.quantity } as IOrderItemBackend;
      orderedItems.push(orderedItem);
    }

    return orderedItems;
  }
}
export const orderServices: OrderServices = new OrderServices();
