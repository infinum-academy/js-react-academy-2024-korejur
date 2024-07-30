import { createReview } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { INewReview, IReview } from "@/typings/review.types";
import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { RatingInput } from "../StarRating/RatingInput";

interface IReviewFormProps {
  showId: number;
}

export const ReviewForm = ({ showId }: IReviewFormProps) => {
  const [submitError, setSubmitError] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
    control,
    setValue,
  } = useForm<IReview>();

  const { trigger: triggerCreateReview } = useSWRMutation(
    swrKeys.create_review,
    createReview,
    {
      onSuccess: () => {
        mutate(swrKeys.reviews(showId));
        mutate(swrKeys.show(showId));
      },
      onError: () => {
        console.error("Error adding review");
      },
    }
  );

  const onSubmit = async (data: IReview) => {
    if (!data.rating) {
      setError("rating", { message: "Rating is required." });
      return;
    }

    const newReview: INewReview = {
      comment: data.comment,
      rating: data.rating,
      show_id: showId,
    };

    try {
      triggerCreateReview(newReview as IReview);
      setSubmitError("");
      reset();
    } catch (error) {
      setSubmitError(error.message);
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
      <RatingInput
        control={control}
        setValue={setValue}
        clearErrors={clearErrors}
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
