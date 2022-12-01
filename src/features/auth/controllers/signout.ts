import { Request, Response } from 'express';

export class SignOut {
  public update(req: Request, res: Response) {
    req.session = null;
    res.status(200).json({ message: 'logout successfull', user: null, token: '' });
  }
}
