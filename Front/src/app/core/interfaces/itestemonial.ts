export interface ITestimonial {
  _id?: string;
  user: {
    name: string;
  };
  content: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: Date;
}
export interface ITestimonialRes{
  data: ITestimonial[];
  message: string;
}