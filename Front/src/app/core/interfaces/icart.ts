export interface ICartItem {
  _id?: string;
  product: {
    _id: string;
    title: string;
    image: string;
  };
  quantity: number;
  price: number;
  subtotal: number;
}
export interface ICart {
  _id?: string;
  sessionId?: string;
  items: ICartItem[];
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICartRes{
  data: ICart;
  message: string;
}
export interface ICartChange {
  product: string;
  title: string;
  type: string;
  oldPrice?: number;
  newPrice?: number;
  requestedQty?: number;
  availableQty?: number;
  message: string;
}
export interface IValidateCartRes {
  message: string;
  hasChanges: boolean;
  changes?: ICartChange[];
}
