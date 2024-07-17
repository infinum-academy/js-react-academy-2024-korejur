"use client";
import { IReview, IReviewList } from "@/typings/review.types";
import { ReviewList } from "../ReviewList/ReviewList";
import { ReviewForm } from "../ReviewForm/ReviewForm";

interface IShowReviewSectionProps {
  showId: number;
  reviewList: IReviewList;
  addShowReview: (review: IReview) => void;
  deleteShowReview: (review: IReview) => void;
}

export const ShowReviewSection = ({
  showId,
  reviewList,
  addShowReview,
  deleteShowReview,
}: IShowReviewSectionProps) => {

  const handleAddReview = (review: IReview) => {
    review.show_id = showId;
    addShowReview(review);
  }
  return (
    <>
      <ReviewForm onAdd={handleAddReview} />
      {reviewList && reviewList.reviews.length > 0 && (
        <ReviewList reviewList={reviewList} onDeleteReview={deleteShowReview} />
      )}
    </>
  );
};
