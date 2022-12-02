import { BadRequestError } from '../../../shared/globals/helpers/errorHandler';
import { IAuthPayload } from './../interfaces/auth.interface';
import { userServices } from './../../../shared/services/db/user.services';
import { IUserDocument } from './../../user/interfaces/user.interface';
import { Request, Response } from 'express';
import { Helpers } from '../../../shared/globals/helpers/helpers';
import JWT from 'jsonwebtoken';
import { config } from '../../../config';
import HTTP_STATUS from 'http-status-codes';

export class SignUp {
  public async create(req: Request, res: Response): Promise<void> {
    // destructure form data from signup form
    const { name, username, password, email, phoneNumber } = req.body;

    // check if user already exists in database
    const exists = await userServices.getUserByUsernameOrEmail(username, email);
    if (exists) {
      throw new BadRequestError('user already exists');
    }
    try {
      // validate username and password fields - validator will throw error and be caught in catch statement
      // also validates phone number is a real moblie number
      await userServices.validateCredentials(username, password, phoneNumber);

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

      res.status(HTTP_STATUS.CREATED).json({ message: 'user signed up successfully' });
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // error will be caught by global error handler in setupServer class and send the response to client
      throw new BadRequestError(`${error.message}`);
    }
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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

  private signToken(data: IAuthPayload): string {
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
