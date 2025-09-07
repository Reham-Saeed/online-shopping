export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUserRes {
  data: IUser;
  message: string;
}
export interface ISignup {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface ILoginRes {
  message: string;
  token: string;
}
export interface IUserData {
  id: string;
  role: string;
  name: string;
  exp: number;
}
