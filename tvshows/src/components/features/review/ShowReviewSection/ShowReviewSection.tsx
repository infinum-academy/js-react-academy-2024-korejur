"use client";
import { IReviewList } from "@/typings/review.types";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { ReviewList } from "../ReviewList/ReviewList";

interface IShowReviewSectionProps {
  showId: number;
  reviewList: IReviewList;
}

export const ShowReviewSection = ({
  showId,
  reviewList,
}: IShowReviewSectionProps) => {
  return (
    <>
      <ReviewForm showId = {showId} />
      {reviewList && reviewList.reviews.length > 0 && (
        <ReviewList reviewList={reviewList} />
      )}
    </>
  );
};
