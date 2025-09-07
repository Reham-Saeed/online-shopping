export interface ICategory {
  _id?: string;
  title: string;
  image: string;
  isDeleted?: boolean;
}
export interface ICategoryRes {
  data: ICategory;
  message: string;
}