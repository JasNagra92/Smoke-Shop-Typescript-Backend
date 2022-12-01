import { userServices } from './../../../shared/services/db/user.services';
import { IUserDocument } from 'src/features/user/interfaces/user.interface';
import { Request, Response, NextFunction } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class CurrentUser {
  public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    let isUser = false;
    let token = null;
    const existingUser: IUserDocument = (await userServices.findUserByUsername(`${req.currentUser?.username}`)) as IUserDocument;
    if (Object.keys(existingUser).length) {
      isUser = true;
      token = req.session?.jwt;
    }
    res.status(HTTP_STATUS.OK).json({ token, isUser });
  }
}
