import { IProduct } from "./iproduct";
import { IUser } from "./iuser";

export interface IOrderItem {
  product: IProduct;
  quantity: number;
  price: number;
  subtotal: number;
}
export interface IOrder {
  _id?: string;
  user: IUser;
  items: IOrderItem[];
  totalPrice: number;
  status?:
    | 'pending'
    | 'preparing'
    | 'ready for shipping'
    | 'shipped'
    | 'delivered'
    | 'rejected'
    | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IOrderRes {
  data: IOrder[];
  message: string;
}