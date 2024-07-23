import { INewReview, IReview } from "@/typings/review.types";
import { Button, Flex, Textarea, Text } from "@chakra-ui/react";
import { useState } from "react";
import StarRating from "../../review/StarRating/StarRating";
import { useForm } from "react-hook-form";
import { createReview } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

interface IReviewFormProps {
  showId: number;
}

export const ReviewForm = ({ showId }: IReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm<IReview>();

  const { trigger: triggerCreateReview } = useSWRMutation(
    swrKeys.create_review,
    createReview,
    {
      onSuccess: () => {
        mutate(swrKeys.reviews((showId)));
        mutate(swrKeys.show(showId))
      },
      onError: () => {
        console.error("Error adding review");
      },
    }
  );

  const onSubmit = async (data: IReview) => {
    if (!rating) {
      setError("rating", { message: "Rating is required." });
      return;
    }

    const newReview: INewReview = {
      comment: data.comment,
      rating: rating,
      show_id: showId,
    };

    try {
      triggerCreateReview(newReview as IReview);
      setRating(0);
      setSubmitError("");
      reset();
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (newRating) {
      clearErrors("rating");
    }
  };

  return (
    <Flex
      as="form"
      direction="column"
      gap={5}
      alignItems="flex-start"
      mt={10}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Textarea
        id="review-input"
        placeholder="Add review"
             isDisabled={isSubmitting}
        {...register("comment")}
      />
      <StarRating
        defaultValue={rating}
        onChange={handleRatingChange}
        mode="interactive"
      />
      {errors.rating && (
        <Text color="error" textStyle="buttonCaption">
          {errors.rating.message}
        </Text>
      )}
      {submitError && (
        <Text color="error" textStyle="buttonCaption">
          {submitError}
        </Text>
      )}
      <Button type="submit" isLoading={isSubmitting}>
        Post
      </Button>
    </Flex>
  );
};
