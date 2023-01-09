import { orderServices } from './../services/db/order.services';
import { DoneCallback, Job } from 'bull';
import Logger from 'bunyan';
import { config } from 'src/config';

const log: Logger = config.createLogger('OrderWorkerLog');

class OrderWorker {
  public async addOrderToQueue(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { email, name, checkoutSessionId, items, pickupDate, amount_total, orderNumber, orderDate } = job.data;
      await orderServices.saveOrderToDB(email, name, checkoutSessionId, items, pickupDate, amount_total, orderNumber, orderDate);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error('error with order worker', error);
      done(error as Error);
    }
  }
}

export const orderWorker: OrderWorker = new OrderWorker();
