import { ValidationError } from './../../globals/helpers/errorHandler';
import { IUserDocument } from './../../../features/user/interfaces/user.interface';
import { userModel } from '../../../features/user/models/user.model';
import validator from 'validator';

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

  public async validateCredentials(email: string, password: string, phoneNumber: string): Promise<void> {
    if (!validator.isEmail(email)) {
      throw new ValidationError('email must be valid');
    }
    if (!validator.isStrongPassword(password)) {
      throw new ValidationError('password not strong enough');
    }
    if (!validator.isMobilePhone(phoneNumber)) {
      throw new ValidationError('phone number must be a phone number');
    }
  }
}

export const userServices: UserServices = new UserServices();
