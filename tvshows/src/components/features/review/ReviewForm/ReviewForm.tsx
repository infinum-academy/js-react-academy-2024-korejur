import { IReview } from "@/typings/review.types";
import { Button, Flex, Textarea, Text } from "@chakra-ui/react";
import { useState } from "react";
import StarRating from "../../review/StarRating/StarRating";
import { useForm } from "react-hook-form";

interface IReviewFormProps {
  onAdd: (review: IReview) => void;
}

export const ReviewForm = ({ onAdd }: IReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset
  } = useForm<IReview>();

  const onClickHandler = (data: IReview) => {
    if (!rating) {
      setError("rating", { message: "Rating is required." });
      return;
    }

    const newReview: IReview = {
      review: data.review,
      rating: rating,
      id: data.id,
      showId: data.showId,
    };

    try {
      onAdd(newReview);
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
      onSubmit={handleSubmit(onClickHandler)}
    >
      <Textarea
        id="review-input"
        variant="outline"
        placeholder="Add review"
        width="100%"
        backgroundColor="aliceblue"
        textColor="#1a1a1a"
        isDisabled={isSubmitting}
        {...register("review")}
      />
      <StarRating
        defaultValue={rating}
        onChange={handleRatingChange}
        mode="interactive"
      />
      {errors.rating && (
        <Text color="red" fontSize="sm">
          {errors.rating.message}
        </Text>
      )}
      {submitError && (
        <Text color="red" fontSize="sm">
          {submitError}
        </Text>
      )}
      <Button type="submit" isLoading={isSubmitting}>
        Post
      </Button>
    </Flex>
  );
};
