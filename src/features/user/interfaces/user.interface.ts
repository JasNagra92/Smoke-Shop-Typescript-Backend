export interface IUserDocument {
  userId: string;
  name: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  comparePassword: (password: string) => Promise<boolean>;
  hashPassword: (password: string) => Promise<string>;
}

export interface IEmailJob {
  receiverEmail: string;
  subject: string;
  body: string;
}
