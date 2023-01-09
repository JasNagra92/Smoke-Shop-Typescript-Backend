import { userServices } from './../../../shared/services/db/user.services';
import { IUserDocument } from '../../user/interfaces/user.interface';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class CurrentUser {
  public async read(req: Request, res: Response): Promise<void> {
    let isUser = false;
    let token = null;
    let user = null;
    const existingUser: IUserDocument = (await userServices.findUserByUsername(`${req.currentUser?.username}`)) as IUserDocument;
    if (Object.keys(existingUser).length) {
      isUser = true;
      token = req.session?.jwt;
      user = existingUser;
    }
    res.status(HTTP_STATUS.OK).json({ token, isUser, user });
  }
}
