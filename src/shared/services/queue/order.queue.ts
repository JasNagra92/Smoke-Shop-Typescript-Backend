import { IOrderJob } from '../../../features/cart/interfaces/order.interface';
import { orderWorker } from './../../workers/orderWorker';
import { BaseQueue } from './base.queue';

class OrderQueue extends BaseQueue {
  constructor() {
    super('order');
    this.processJob('addOrderToDB', 5, orderWorker.addOrderToQueue);
  }
  public addOrderJob(name: string, data: IOrderJob): void {
    this.addJob(name, data);
  }
}

export const orderQueue: OrderQueue = new OrderQueue();
