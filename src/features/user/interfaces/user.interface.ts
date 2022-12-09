import { Document } from 'mongoose';

export interface IUserDocument extends Document {
  userId: string;
  name: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  passwordResetToken?: string;
  passwordResetExpires?: number;
  comparePassword: (password: string) => Promise<boolean>;
  hashPassword: (password: string) => Promise<string>;
}
