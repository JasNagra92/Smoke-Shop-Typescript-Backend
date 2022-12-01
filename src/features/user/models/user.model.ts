import { IUserDocument } from './../interfaces/user.interface';
import { Schema, Model } from 'mongoose';

const userSchema: Schema = new Schema({
  email: {
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
  }
});

userSchema.pre('save');

const userModel: Model<IUserDocument> = new Model('users', userSchema);
