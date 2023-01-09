import HTTP_STATUS from 'http-status-codes';
import { orderServices } from '../../../shared/services/db/order.services';
import { Request, Response } from 'express';

export class Cart {
  public async getExcludedDates(req: Request, res: Response): Promise<void> {
    const formattedDates = await orderServices.getExcludedDates();
    res.status(HTTP_STATUS.OK).json({ dates: formattedDates });
  }
}
