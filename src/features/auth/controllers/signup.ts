import { AuthPayload } from './../interfaces/auth.interface';
import { userServices } from './../../../shared/services/db/user.services';
import { IUserDocument } from './../../user/interfaces/user.interface';
=import { Request, Response } from 'express';
import { Helpers } from 'src/shared/globals/helpers';
import JWT from 'jsonwebtoken';
import { config } from '../../../config';

export class SignUp {
  public async create(req: Request, res: Response): Promise<void> {
    // destructure form data from signup form
    const { name, username, password, email, phoneNumber } = req.body;

    // check if user already exists in database
    const exists = await userServices.getUserByUsernameOrEmail(username, email);
    if (exists) {
      throw new Error('user already exists');
    }

    // create 12 digit userId for user
    const userId = Helpers.createRandomIntegers(12);

    // add user Id to data sent from the front end form
    const dataToSave = SignUp.prototype.createUserDocument(userId, { username, password, email, phoneNumber, name });

    // save user to database
    await userServices.addUserToDB(dataToSave);

    // create jwt with user data
    const token = SignUp.prototype.signToken({ username, email, userId });

    // add token to request object
    req.session = { jwt: token };

    res.status(200).json({ message: 'user signed up successfully' });
  }

  private createUserDocument(userId: string, data: any): IUserDocument {
    const { username, password, email, phoneNumber, name } = data;
    return {
      userId: userId,
      username,
      name,
      password,
      email,
      phoneNumber
    } as unknown as IUserDocument;
  }

  private signToken(data: AuthPayload): string {
    return JWT.sign(
      {
        userId: data.userId,
        username: data.username,
        email: data.email
      },
      config.JWT_SECRET!
    );
  }
}
