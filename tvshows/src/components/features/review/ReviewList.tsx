import { IReview, IReviewList } from "@/typings/review.types";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ReviewItem } from "./ReviewItem";
import { Fragment } from "react";

interface IReviewListProps {
  reviewList: IReviewList;
  onDeleteReview: (review: IReview) => void;
}

export const ReviewList = ({ reviewList, onDeleteReview }: IReviewListProps) => {
  return (
    <Fragment>
      <Box textAlign="left" mt={10} mb={5}>
        <Heading size="lg">{reviewList.title}</Heading>
      </Box>
      <Flex direction="column" gap={15}>
        {reviewList.reviews.map((review, index) => (
          <ReviewItem key={index} reviewItem={review} onDelete={onDeleteReview} />
        ))}
      </Flex>
    </Fragment>
  );
};
