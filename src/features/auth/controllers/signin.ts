import { userServices } from './../../../shared/services/db/user.services';
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { config } from '../../../config';
import HTTP_STATUS from 'http-status-codes';
import { ValidationError } from '../../../shared/globals/helpers/errorHandler';

export class SignIn {
  public async verify(req: Request, res: Response): Promise<void> {
    // destructure username and password from request
    const { username, password } = req.body;

    const user = await userServices.findUserByUsername(username);
    if (!user) {
      throw new ValidationError('username not found');
    }
    // check password in request body with password stored in database
    const checkPassword: boolean = await user?.comparePassword(password);
    if (!checkPassword) {
      throw new ValidationError('passwords do not match');
    }
    // create jwt token with retrieved user information
    const userJwt: string = JWT.sign(
      {
        username: user.username,
        email: user.email,
        userId: user.userId
      },
      config.JWT_SECRET!
    );

    req.session = { jwt: userJwt };

    res.status(HTTP_STATUS.OK).json({ message: 'login successfull', token: userJwt });
  }
}
