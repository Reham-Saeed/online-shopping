export interface ISubcategory {
  _id: string;
  title: string;
  image: string;
  route: string;
  category: {
    _id: string;
    title: string;
  };
  isDeleted?: boolean;
}
export interface ISubcategoryRes {
  data: ISubcategory[];
  message: string;
}
