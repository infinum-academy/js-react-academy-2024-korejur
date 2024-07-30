import { IReview } from "@/typings/review.types";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import StarRating from "../StarRating/StarRating";
import { deleteReview } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/fetchers/fetcher";

const maxRating = "5";

interface IReviewItemProps {
  reviewItem: IReview;
}

export const ReviewItem = ({ reviewItem }: IReviewItemProps) => {
  const userName = reviewItem.user.email?.split("@")[0] ?? "anonymous";
  const { data: userResponse } = useSWR(swrKeys.user, fetcher);

  const { trigger: triggerDeleteReview } = useSWRMutation(
    swrKeys.review(reviewItem.id),
    deleteReview,
    {
      onSuccess: () => {
        mutate(swrKeys.reviews(reviewItem.show_id));
        mutate(swrKeys.show(reviewItem.show_id));
      },
      onError: () => {
        console.error("Error deleting review");
      },
    }
  );

  return (
    <Box
      borderRadius="cardRadius"
      p={5}
      textAlign="left"
      backgroundColor="my_purple"
    >
      <Box display="flex" alignItems="center" padding="20px">
        <Image
          borderRadius="100px"
          fallbackSrc="/images/placeholder_user.jpg"
          boxSize="30px"
          src={reviewItem.user.image_url}
          alt="User avatar"
          mr="2"
          marginRight="20px"
        />
        <Text textStyle="smallCaptionBold">{userName}</Text>
      </Box>
      {reviewItem.comment && (
        <Box mt="1" as="p" padding="0px 20px">
          <Text textStyle="smallCaption">{reviewItem.comment}</Text>
        </Box>
      )}
      <Flex align="center" flexDirection="row" mt={5} ml={5}>
        <Text mr={3} mt={1} textStyle="smallCaption">
          {reviewItem.rating
            ? `${reviewItem.rating}/${maxRating}`
            : "No rating"}
        </Text>
        <StarRating
          defaultValue={reviewItem.rating}
          onChange={() => {}}
          mode={"static"}
        />
      </Flex>
      <Box display="flex" justifyContent="flex-end" mb={5}>
        {userResponse?.user.id === reviewItem.user.id && (
          <Button onClick={() => triggerDeleteReview()}>Remove</Button>
        )}{" "}
      </Box>
    </Box>
  );
};
