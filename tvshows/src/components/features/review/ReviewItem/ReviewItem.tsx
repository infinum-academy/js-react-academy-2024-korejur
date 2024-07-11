import { IReview } from '@/typings/review.types';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import StarRating from '../StarRating/StarRating';

const maxRating = '5';

interface IReviewItemProps {
  reviewItem: IReview;
  onDelete: (review: IReview) => void;
}

export const ReviewItem = ({ reviewItem, onDelete }: IReviewItemProps) => {
  const userName = reviewItem.email?.split('@')[0] ?? 'anonymous';
  /* Nije mi baš bilo jasno otkud bismo povlačili email i avatar korisnika 
  budući da nema nikakvog logina tako da se svi po defaultu prikazuju kao anonymousi bez profilne. 
  Iz maila se uzima samo dio prije '@' jer mi je prirodnije (a možda i sigurnije) prikazati email adresu bez domene.*/

  return (
    <Box backgroundColor='#380a88' borderRadius='lg' p={5} textAlign='left'>
      <Box display='flex' alignItems='center' padding='20px'>
        <Image
          borderRadius='100px'
          fallbackSrc='/images/placeholder_user.jpg'
          boxSize='30px'
          src={reviewItem.avatar}
          alt='User avatar'
          mr='2'
          marginRight='20px'
        />
        <Text fontSize='1em'>{userName}</Text>
      </Box>
      {reviewItem.review && (
        <Box mt='1' as='p' color='aliceblue' padding='0px 20px'>
          {reviewItem.review}
        </Box>
      )}
      {/* <Box
        mt='2'
        as='p'
        lineHeight='tight'
        noOfLines={1}
        color='aliceblue'
        padding='15px 20px 15px 20px'
        fontWeight='semibold'
      >
        {reviewItem.rating
          ? `${reviewItem.rating} / ${maxRating}`
          : 'No rating'}
      </Box> */}
      <Flex align='center' flexDirection='row' mt={5} ml={5}>
        <StarRating defaultValue={reviewItem.rating} onChange={() => {}} mode={'static'} />
        <Text ml={5} mt={1} as='b'>
          {reviewItem.rating
            ? `${reviewItem.rating} / ${maxRating}`
            : 'No rating'}
        </Text>
      </Flex>
      <Box
        display='flex'
        justifyContent='flex-end'
        padding='0px 20px 15px 20px'
      >
        <Button onClick={() => onDelete(reviewItem)}>Remove</Button>
      </Box>
    </Box>
  );
};
