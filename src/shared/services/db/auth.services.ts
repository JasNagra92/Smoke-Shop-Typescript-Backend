import { IUserDocument } from '../../../features/user/interfaces/user.interface';
import { userModel } from '../../../features/user/models/user.model';

export class AuthServices {
  public async setResetToken(email: string, token: string): Promise<void> {
    const user = await userModel.findOne({ email }).exec();

    user!.passwordResetToken = token;
    user!.passwordResetExpires = Date.now() * 60 * 60 * 1000;
    user!.save();
  }
  public async findUserByResetToken(token: string): Promise<IUserDocument | null> {
    const user = await userModel.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } }).exec();
    return user;
  }
}

export const authServices: AuthServices = new AuthServices();
