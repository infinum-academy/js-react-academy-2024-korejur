"use client";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { ReviewList } from "../ReviewList/ReviewList";
import { Spinner } from "@chakra-ui/react";

export const ShowReviewSection = () => {
  const params = useParams();
  const showId = params?.id;

  const {
    data: reviewListResponse,
    error: reviewError,
    isLoading: reviewIsLoading,
  } = useSWR(swrKeys.reviews(Number(showId)), { fetcher });

  if (reviewIsLoading) {
    return <Spinner/>
  }

  if (reviewError) {
    return <div>Oops, something went wrong...</div>;
  }

  return (
    <>
      <ReviewForm showId={Number(showId)} />
      {reviewListResponse && reviewListResponse.reviews.length > 0 && (
        <ReviewList reviewList={reviewListResponse} />
      )}
    </>
  );
};
