import { IUserDocument } from './../../../features/user/interfaces/user.interface';
import { userModel } from '../../../features/user/models/user.model';

class UserServices {
  public async addUserToDB(data: IUserDocument): Promise<void> {
    await userModel.create(data);
  }

  public async findUserByUsername(username: string): Promise<IUserDocument | null> {
    const foundUser = await userModel.findOne({ username });
    return foundUser;
  }
}

export const userServices: UserServices = new UserServices();
