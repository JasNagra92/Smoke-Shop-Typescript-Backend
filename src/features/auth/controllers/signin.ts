import { userServices } from './../../../shared/services/db/user.services';
import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { config } from 'src/config';

export class SignIn {
  public async verify(req: Request, res: Response, next: NextFunction): Promise<void> {
    // destructure username and password from request
    const { username, password } = req.body;

    const user = await userServices.findUserByUsername(username);
    console.log(user);
    if (!user) {
      throw new Error('username not found');
    }
    // check password in request body with password stored in database
    const checkPassword = await user?.comparePassword(password);
    if (!checkPassword) {
      throw new Error('passwords do not match');
    }
    // create jwt token with retrieved user information
    const token = JWT.sign(
      {
        username: user?.username,
        email: user?.email,
        userId: user?.userId
      },
      config.JWT_SECRET!
    );

    req.session = { jwt: token };

    res.status(200).json({ message: 'login successfull' });
  }
}
