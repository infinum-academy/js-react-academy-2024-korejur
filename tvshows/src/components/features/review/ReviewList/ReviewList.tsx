import { IReviewList } from "@/typings/review.types";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Fragment } from "react";
import { ReviewItem } from "../ReviewItem/ReviewItem";

interface IReviewListProps {
  reviewList: IReviewList;
}

export const ReviewList = ({ reviewList }: IReviewListProps) => {
  return (
    <Fragment>
      <Box textAlign="left" mt={10} mb={5}>
        <Heading fontSize='3xl'>Reviews</Heading>
      </Box>
      <Flex direction="column" gap={15}>
        {reviewList.reviews.map((review) => (
          <ReviewItem key={review.id} reviewItem={review}/>
        ))}
      </Flex>
    </Fragment>
  );
};
