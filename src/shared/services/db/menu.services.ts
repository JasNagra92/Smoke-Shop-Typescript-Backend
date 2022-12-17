import { IMenuItemDocument } from 'src/features/menu/interfaces/menu.interface';
import { MenuItemModel } from 'src/features/menu/models/menu.model';

class MenuItemService {
  public async getMenuItemById(_id: string): Promise<IMenuItemDocument> {
    const item: IMenuItemDocument = (await MenuItemModel.findById({ _id }).exec()) as IMenuItemDocument;
    return item;
  }

  public async getAllMenuItems(): Promise<IMenuItemDocument[]> {
    // send all menu items to front end but exclude price_id to keep source of truth in backend server
    const items: IMenuItemDocument[] = await MenuItemModel.find({}, { price_id: 0 }).exec();
    return items;
  }
}

export const menuItemService: MenuItemService = new MenuItemService();
