import { ShowReviewSection } from "@/components/features/review/ShowReviewSection/ShowReviewSection";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { Container } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import useSWR from "swr";
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
      px={{ base: "0", md: "5vh" }}
      py="5vh"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      {showListResponse && (
        <ShowDetailsCard show={showListResponse} averageRating={avgRating()} />
      )}
      <ShowReviewSection
        reviewList={reviewListResponse}
        showId={Number(showId)}
      />
    </Container>
  );
};
