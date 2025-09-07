export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: {
    _id: string;
    title: string;
  };
  subcategory: {
    _id: string;
    title: string;
  };
  route: string;
  isDeleted: boolean;
}
export interface IProductsRes {
  data: IProduct[];
  message: string;
}
export interface IProductRes {
  data: IProduct;
  message: string;
}
