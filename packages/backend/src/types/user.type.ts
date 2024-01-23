export interface ICreateUser {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  passwordHash: string;
  isVerified: boolean;
}
