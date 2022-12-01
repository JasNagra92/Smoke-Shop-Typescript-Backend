import { IAuthPayload } from './../../../features/auth/interfaces/auth.interface';
import { NotAuthorizedError } from '../helpers/errorHandler';
import { Response, Request, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { config } from '../../../config';

export class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError('Token is not available, please login again');
    }

    try {
      const payload: IAuthPayload = JWT.verify(req.session?.jwt, config.JWT_SECRET!) as IAuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError('Token is invalid, please login again');
    }
    next();
  }

  public checkAuthentication(req: Request, _res: Response, next: NextFunction): void {
    if (!req.currentUser) {
      throw new NotAuthorizedError('Authentication is required to access this route');
    }
    next();
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
