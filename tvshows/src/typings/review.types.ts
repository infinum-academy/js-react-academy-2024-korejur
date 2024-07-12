export interface IReview {
  id: number;
  showId: number;
  avatar?: string;
  email?: string;
  rating: number;
  review?: string;
}

export interface IReviewList {
  title: string;
  reviews: Array<IReview>;
}
