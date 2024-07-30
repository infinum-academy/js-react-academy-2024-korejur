import { IReviewList } from "@/typings/review.types";
import { Flex } from "@chakra-ui/react";
import { Fragment } from "react";
import { ReviewItem } from "../ReviewItem/ReviewItem";

interface IReviewListProps {
  reviewList: IReviewList;
  page: number;
  itemsPerPage: number;
}

export const ReviewList = ({ reviewList, page, itemsPerPage }: IReviewListProps) => {
  return (
    <Fragment>
      <Flex direction="column" gap={15}>
        {reviewList.reviews.map((review) => (
          <ReviewItem key={review.id} reviewItem={review} page={page} itemsPerPage={itemsPerPage} />
        ))}
      </Flex>
    </Fragment>
  );
};
