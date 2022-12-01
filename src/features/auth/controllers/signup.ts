import { Request, Response } from 'express';
import userModel from '../../user/models/user.model';

export class SignUp {
  public create(req: Request, res: Response): void {
    // destructure form data from signup form
    const { username, password, email } = req.body;

    // check if user already exists in database
  }
}
