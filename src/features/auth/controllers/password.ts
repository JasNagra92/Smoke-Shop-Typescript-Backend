import { emailServices } from './../../../shared/services/email/email.services';
import { authServices } from './../../../shared/services/db/auth.services';
import HTTP_STATUS from 'http-status-codes';
import { BadRequestError } from './../../../shared/globals/helpers/errorHandler';
import { userServices } from './../../../shared/services/db/user.services';
import { Request, Response } from 'express';
import crypto from 'crypto';
import { config } from '../../../config';

export class Password {
  public async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    const user = await userServices.getUserByUsernameOrEmail('danny', email);

    if (!user) {
      throw new BadRequestError('No Email matches entered email');
    }

    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomCharacters: string = randomBytes.toString('hex');

    await authServices.setResetToken(email, randomCharacters);
    await emailServices.sendForgotPasswordEmail(email, user.username, `${config.CLIENT_URL}/resetPassword?token=${randomCharacters}`);

    res.status(HTTP_STATUS.OK).json({ message: 'reset email sent' });
  }

  public async resetPassword(req: Request, res: Response): Promise<void> {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    if (password !== confirmPassword) {
      throw new BadRequestError('passwords must match');
    }

    const existingUser = await authServices.findUserByResetToken(token);

    if (!existingUser) {
      throw new BadRequestError('Reset token has expired');
    }

    existingUser.password = password;
    await existingUser.save();

    res.status(HTTP_STATUS.OK).json({ message: 'password updated successfully' });
  }
}
