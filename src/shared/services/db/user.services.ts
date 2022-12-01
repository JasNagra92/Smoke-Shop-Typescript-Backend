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

  public async getUserByUsernameOrEmail(username: string, email: string): Promise<IUserDocument | null> {
    const query = {
      $or: [{ username }, { email }]
    };

    const user: IUserDocument = (await userModel.findOne(query).exec()) as IUserDocument;
    return user;
  }
}

export const userServices: UserServices = new UserServices();
