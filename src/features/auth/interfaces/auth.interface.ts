declare global {
  namespace Express {
    interface Request {
      currentUser?: IAuthPayload;
    }
  }
}

export interface IAuthPayload {
  userId: string;
  email: string;
  username: string;
  iat?: number;
}
