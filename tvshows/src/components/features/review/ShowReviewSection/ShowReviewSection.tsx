"use client";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { Box, Flex, IconButton, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { ReviewList } from "../ReviewList/ReviewList";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export const ShowReviewSection = () => {
  const params = useParams();
  const showId = params?.id;

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: reviewListResponse,
    error: reviewError,
    isLoading: reviewIsLoading,
  } = useSWR(
    `${swrKeys.reviews(Number(showId))}?page=${page}&items=${itemsPerPage}`,
    { fetcher }
  );

  if (reviewError) {
    return <div>Oops, something went wrong...</div>;
  }

  if (reviewIsLoading) {
    return <Spinner />;
  }

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      gap={{ base: "0", lg: "50" }}
    >
      <Box
        textAlign="left"
        mt={{ base: "0", lg: "10" }}
        mb={{ base: "0", lg: "5" }}
      >
        <Text textStyle="h2">Reviews</Text>
      </Box>
      <Flex direction="column" width="100%" gap={10}>
        <ReviewForm showId={Number(showId)} page={page} itemsPerPage={itemsPerPage} />
        {reviewListResponse && reviewListResponse.reviews.length > 0 && (
          <>
            <ReviewList reviewList={reviewListResponse} page={page} itemsPerPage={itemsPerPage} />
            <Flex justifyContent="center" mt={4}>
              {page > 1 && (
                <IconButton
                  icon={<ChevronLeftIcon />}
                  aria-label="previous page of reviews"
                  onClick={() => setPage(page - 1)}
                  variant="back"
                  size="md"
                  backgroundColor="dark_purple"
                ></IconButton>
              )}
              <Flex mx={2} alignItems="center">
                Page {page} of {reviewListResponse.meta.pagination.pages}
              </Flex>
              {page < reviewListResponse.meta.pagination.pages && (
                <IconButton
                  icon={<ChevronRightIcon />}
                  aria-label="next page of reviews"
                  variant="back"
                  backgroundColor="dark_purple"
                  size="md"
                  onClick={() => setPage(page + 1)}
                ></IconButton>)}
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};
