import HTTP_STATUS from 'http-status-codes';
import { menuItemService } from './../../../shared/services/db/menu.services';
import { IMenuItemDocumentFrontEnd } from './../interfaces/menu.interface';
import { Request, Response } from 'express';

export class Menu {
  public async getMenu(req: Request, res: Response): Promise<void> {
    const menu: IMenuItemDocumentFrontEnd[] = await menuItemService.getAllMenuItems();
    res.status(HTTP_STATUS.OK).json({ menu });
  }
}
