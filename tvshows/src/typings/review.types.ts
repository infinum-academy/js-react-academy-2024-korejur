import { IUser } from "./user.types";

export interface IReview {
  id: number;
  show_id: number;
  rating: number;
  comment?: string;
  user: IUser;
}

export interface IReviewList {
  reviews: Array<IReview>;
}

export interface INewReview {
  show_id: number;
  rating: number;
  comment?: string;
}
