import { IUserDocument } from './../interfaces/user.interface';
import { Schema, Model, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const SALT = 10;

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (this: IUserDocument, next: () => void): Promise<void> {
  const hashedPassword: string = await hash(this.password, SALT);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const hashedPassword: string = (this as unknown as IUserDocument).password!;
  const result = await compare(password, hashedPassword);
  return result;
};

userSchema.methods.hashPassword = async (password: string): Promise<string> => {
  const hashedPassword: string = await hash(password, SALT);
  return hashedPassword;
};

export const userModel: Model<IUserDocument> = model<IUserDocument>('users', userSchema);
