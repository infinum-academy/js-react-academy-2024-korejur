import { fetcher } from "@/fetchers/fetcher";
import { deleteReview, updateReview } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { IReview } from "@/typings/review.types";
import { IUser } from "@/typings/user.types";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { RatingInput } from "../StarRating/RatingInput";
import StarRating from "../StarRating/StarRating";

const maxRating = "5";

interface IReviewItemProps {
  reviewItem: IReview;
  page: number;
  itemsPerPage: number;
}

export const ReviewItem = ({
  reviewItem,
  page,
  itemsPerPage,
}: IReviewItemProps) => {
  const userName = reviewItem.user.email?.split("@")[0] ?? "anonymous";
  const { data: userResponse } = useSWR<{ user: IUser }>(swrKeys.user, fetcher);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<IReview>({
    defaultValues: reviewItem,
  });

  const { trigger: triggerDeleteReview } = useSWRMutation(
    swrKeys.review(reviewItem.id),
    deleteReview,
    {
      onSuccess: () => {
        mutate(swrKeys.reviews(reviewItem.show_id));
        mutate(
          `${swrKeys.reviews(
            reviewItem.show_id
          )}?page=${page}&items=${itemsPerPage}`
        );
        mutate(swrKeys.show(reviewItem.show_id));
        setIsDeleting(false);
      },
      onError: () => {
        console.error("Error deleting review");
        setIsDeleting(false);
      },
    }
  );

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await triggerDeleteReview();
    } catch (error) {
      console.error("Error during deletion", error);
      setIsDeleting(false);
    }
  };

  const { trigger: triggerUpdateReview } = useSWRMutation(
    swrKeys.review(reviewItem.id),
    updateReview,
    {
      onSuccess: () => {
        mutate(swrKeys.reviews(reviewItem.show_id));
        mutate(
          `${swrKeys.reviews(
            reviewItem.show_id
          )}?page=${page}&items=${itemsPerPage}`
        );
        mutate(swrKeys.show(reviewItem.show_id));
        setIsEditing(false);
      },
      onError: () => {
        console.error("Error updating review");
      },
    }
  );

  const onSubmit = async (data: IReview) => {
    try {
      await triggerUpdateReview(data);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <Flex
      direction="column"
      borderRadius="cardRadius"
      px={5}
      textAlign="left"
      backgroundColor="purple_2"
      alignItems="flex-start"
    >
      <Flex direction={{ base: "column", lg: "row" }}>
        <Flex alignItems="center" padding="20px">
          <Image
            borderRadius="100px"
            fallbackSrc="/images/placeholder_user.jpg"
            boxSize="35px"
            src={reviewItem.user.image_url}
            alt="User avatar"
            mr="2"
            marginRight="20px"
          />
          <Flex direction="column" width={150}>
            <Text textStyle="smallCaptionBold">{userName}</Text>
            <Flex align="left" flexDirection="row">
              <Text mr={3} mt={1} textStyle="buttonCaption">
                {reviewItem.rating
                  ? `${reviewItem.rating}/${maxRating}`
                  : "No rating"}
              </Text>
              <StarRating
                defaultValue={reviewItem.rating}
                onChange={() => {}}
                mode={"static"}
                size={4}
                noOfStars={reviewItem.rating}
              />
            </Flex>
          </Flex>
        </Flex>
        {isEditing ? (
          <Flex pt={5} direction="column">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                placeholder="Edit review"
                {...register("comment")}
                mb={1}
              />
              <Flex
                justifyContent="space-between"
                alignContent="center"
                width="100%"
              >
                <RatingInput
                  control={control}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  defaultValue={reviewItem.rating}
                />
                <Flex width="100%" px={2} justifyContent="flex-end">
                  <IconButton
                    icon={<CheckIcon />}
                    aria-label="Save edited review"
                    variant="back"
                    type="submit"
                    isLoading={isSubmitting}
                    mt={3}
                  ></IconButton>
                  <IconButton
                    icon={<CloseIcon />}
                    aria-label="Cancel editing review"
                    variant="back"
                    onClick={() => setIsEditing(false)}
                    mt={3}
                    ml={2}
                  ></IconButton>
                </Flex>
              </Flex>
            </form>
          </Flex>
        ) : (
          <>
            {reviewItem.comment && (
              <Box p="20px">
                <Text textStyle="smallCaption" textAlign="left">
                  {reviewItem.comment}
                </Text>
              </Box>
            )}
          </>
        )}
      </Flex>

      {userResponse?.user.id === reviewItem.user.id && !isEditing && (
        <Flex width="100%" px={5} pb={2} justifyContent="flex-end">
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit review"
            variant="back"
            onClick={() => setIsEditing(!isEditing)}
            size="md"
          />
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete button"
            variant="back"
            onClick={handleDelete}
            isLoading={isDeleting}
            isDisabled={isDeleting}
            size="md"
          ></IconButton>
        </Flex>
      )}
    </Flex>
  );
};
