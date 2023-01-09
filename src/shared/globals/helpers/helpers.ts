import { IOrderForDatabase } from '../../../features/cart/interfaces/order.interface';
import { orderModel } from '../../../features/cart/models/order.model';

export class Helpers {
  static createRandomIntegers(num: number): string {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let string = '';
    let length = 0;
    while (length < num) {
      string += numbers[Math.floor(Math.random() * 10)];
      length++;
    }
    return string;
  }
  static async createOrderNumber(): Promise<number> {
    let repeat;
    let orderNumber;
    do {
      orderNumber = this.randomNumbers(100000, 999999);
      const exists: IOrderForDatabase | null = await orderModel.findOne({ orderNumber }).exec();
      repeat = exists ? true : false;
    } while (repeat);
    return orderNumber;
  }

  private static randomNumbers(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min));
  }
}
