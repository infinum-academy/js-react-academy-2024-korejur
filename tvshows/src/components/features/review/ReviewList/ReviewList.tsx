import { IReviewList } from "@/typings/review.types";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { ReviewItem } from "../ReviewItem/ReviewItem";

interface IReviewListProps {
  reviewList: IReviewList;
}

export const ReviewList = ({ reviewList }: IReviewListProps) => {
  return (
    <Fragment>
      <Box textAlign="left" mt={10} mb={5}>
        <Text textStyle="h2">Reviews</Text>
      </Box>
      <Flex direction="column" gap={15}>
        {reviewList.reviews.map((review) => (
          <ReviewItem key={review.id} reviewItem={review}/>
        ))}
      </Flex>
    </Fragment>
  );
};
