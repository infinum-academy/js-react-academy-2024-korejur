import { IReview } from '@/typings/review.types';
import { Button, Flex, Textarea, Text } from '@chakra-ui/react';
import { useState } from 'react';
import StarRating from '../../review/StarRating/StarRating';

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

    const reviewValue = reviewInput.value;
    // const ratingValue = parseInt(ratingInput.value);
    const ratingValue = rating;

    if (!ratingValue) {
      setErrorMessage('Rating is required.')
      return;
    }

    const newReview: IReview = {
      review: reviewValue,
      rating: ratingValue,
      id: 0,
      showId: 0
    };

    onAdd(newReview);
    reviewInput.value = '';
    setRating(0);
    setErrorMessage('');
  };
  
  return (
    <Flex direction='column' gap={5} alignItems='flex-start' mt={10}>
      <Textarea id='review-input' variant='outline' placeholder='Add review' width='100%' backgroundColor='aliceblue' textColor='#1a1a1a' />
      <StarRating defaultValue={rating} onChange={setRating} mode='interactive' />
      {errorMessage && (<Text color='red' fontSize='sm'>{errorMessage}</Text>)}
      <Button onClick={onClickHandler}>Post</Button>
    </Flex>
  );
};
