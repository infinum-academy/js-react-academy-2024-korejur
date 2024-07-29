import { fetcher } from '@/fetchers/fetcher';
import { swrKeys } from '@/fetchers/swrKeys';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Card, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

const maxRating = '5';

export const ShowDetailsCard = () => {
  const params = useParams();
  const showId = params?.id;
  const {
    data: showListResponse,
    error: showError,
    isLoading: showIsLoading,
  } = useSWR(swrKeys.show(Number(showId)), { fetcher });

  if (showIsLoading) {
    return <div>Loading...</div>;
  }

  if (showError) {
    return <div>Oops, something went wrong...</div>;
  }
  const { show: showData } = showListResponse;

  return (
    <Card
      overflow="hidden"
      mt={-10}
      mb={10}
      borderRadius="cardRadius"
      width="100%"
    >
      <Image
        src={showData.image_url}
        alt={
          showData.image_alt ? showData.image_alt : 'Photo may not be available'
        }
        fallbackSrc="/images/placeholder.jpg"
        width="100%"
        height={{ base: '30vh', md: '50vh' }}
        objectFit="cover"
      />
      <Box
        p={8}
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        gap={{ base: '5', md: '50' }}
      >
        <Flex flexDirection="column">
          <Text textStyle="h1" textAlign="left">
            {showData.title}
          </Text>
          <Flex flexDirection="row" alignItems="center">
            <Icon as={StarIcon}></Icon>
            <Text ml={2} textStyle="h2">
              {showData.average_rating
                ? `${showData.average_rating.toFixed(1)}/${maxRating}`
                : 'No ratings'}
            </Text>
          </Flex>
        </Flex>
        <Text textStyle="body" textAlign="left" mt={2}>
          {showData.description}
        </Text>
      </Box>
    </Card>
  );
};
