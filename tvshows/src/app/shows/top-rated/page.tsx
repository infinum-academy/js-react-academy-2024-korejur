'use client'
import { ShowsList } from "@/components/features/shows/ShowsList/ShowsList";
import { Flex } from '@chakra-ui/react';

const TopRated = () => {
  return (
    <Flex justifyContent="center">
    <ShowsList route='/api/shows/top-rated' getter={false} />
  </Flex>
  );
};

export default TopRated;
