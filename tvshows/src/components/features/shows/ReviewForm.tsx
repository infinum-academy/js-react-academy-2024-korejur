import { IReview } from '@/typings/review.types';
import { Button, Flex, Input, Textarea, Text } from '@chakra-ui/react';
import { useState } from 'react';
import StarRating from '../review/StarRating';

interface IReviewFormProps {
  onAdd: (review: IReview) => void;
}

export const ReviewForm = ({ onAdd }: IReviewFormProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [rating, setRating] = useState(0);
  
  const onClickHandler = () => {
    const reviewInput = document.getElementById(
      'review-input'
    ) as HTMLInputElement;
    // const ratingInput = document.getElementById(
    //   'rating-input'
    // ) as HTMLInputElement;

    const reviewValue = reviewInput.value;
    // const ratingValue = parseInt(ratingInput.value);
    const ratingValue = rating;

    if (!ratingValue) {
      setErrorMessage('Rating is required.')
      return;
    }

    // if (ratingValue < 1 || ratingValue > 5) {
    //   setErrorMessage('Rating must be between 1 and 5.')
    //   return;
    // }

    const newReview: IReview = {
      review: reviewValue,
      rating: ratingValue,
    };

    onAdd(newReview);
    reviewInput.value = '';
    // ratingInput.value = '';
    setRating(0);
    setErrorMessage('');
  };
  
  return (
    <Flex direction='column' gap={5} alignItems='flex-start' mt={10}>
      <Textarea id='review-input' variant='outline' placeholder='Add review' width='100%' backgroundColor='aliceblue' textColor='#1a1a1a' />
      {/* <Input
        id='rating-input'
        type='number'
        min={1}
        max={5}
        variant='outline'
        placeholder='Add rating'
        width='20%'
        backgroundColor='aliceblue'
        textColor='#1a1a1a'
      /> */}
      <StarRating defaultValue={rating} onChange={setRating} mode={2} />
      {errorMessage && (<Text color='red' fontSize='sm'>{errorMessage}</Text>)}
      <Button onClick={onClickHandler}>Post</Button>
    </Flex>
  );
};
