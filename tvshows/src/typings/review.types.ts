export interface IReview {
  // id: number,
  show_id: number;
  avatar?: string;
  email?: string;
  rating: number;
  comment?: string;
}

export interface IReviewList {
  reviews: Array<IReview>;
}
