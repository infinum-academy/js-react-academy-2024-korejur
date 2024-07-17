import { ShowReviewSection } from "@/components/features/review/ShowReviewSection/ShowReviewSection";
import { fetcher } from "@/fetchers/fetcher";
import { createReview, deleteReview } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { IReview } from "@/typings/review.types";
import { Container } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import { ShowDetailsCard } from "../ShowDetailsCard/ShowDetailsCard";

export const ShowContainer = () => {
  const params = useParams();
  const showId = params?.id;

  const {
    data: showListResponse,
    error: showError,
    isLoading: showIsLoading,
  } = useSWR(swrKeys.show(Number(showId)), { fetcher });

  const {
    data: reviewListResponse,
    error: reviewError,
    isLoading: reviewIsLoading,
  } = useSWR(swrKeys.reviews(Number(showId)), { fetcher });

  const addShowReview = async (review: IReview) => {
    try {
      await createReview(swrKeys.create_review, { arg: review });
      console.log(reviewListResponse);
      mutate(swrKeys.reviews(Number(showId)));
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const deleteShowReview = async (reviewToRemove: IReview) => {
    try {
      await deleteReview(swrKeys.review(Number(reviewToRemove.id)));
      mutate(swrKeys.reviews(Number(showId)));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const avgRating = () => {
    if (!reviewListResponse || reviewListResponse.reviews.length === 0) {
      return null;
    }
    const totalRating = reviewListResponse.reviews.reduce(
      (sum: number, review: { rating: number }) => sum + review.rating,
      0
    );
    return totalRating / reviewListResponse.reviews.length;
  };

  if (showIsLoading || reviewIsLoading) {
    return <div>Loading...</div>;
  }

  if (showError || reviewError) {
    return <div>Oops, something went wrong...</div>;
  }

  return (
    <Container
      maxW="container.lg"
      backgroundColor="#1e024d"
      textColor="aliceblue"
      p="5vh"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      {showListResponse && (
        <ShowDetailsCard show={showListResponse} averageRating={avgRating()} />
      )}
      <ShowReviewSection
        reviewList={reviewListResponse}
        addShowReview={addShowReview}
        deleteShowReview={deleteShowReview}
        showId={Number(showId)}
      />
    </Container>
  );
};
