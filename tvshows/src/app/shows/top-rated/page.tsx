'use client'
import { ShowsList } from '@/components/shared/ShowsList/ShowsList';
import { getTopRatedShowLists } from '@/fetchers/show';
import { Box } from '@chakra-ui/react';

const TopRated = () => {
  return (
    <Box flex="1" p="4" display="flex" justifyContent="center">
    <ShowsList route='/api/shows/top-rated' getter={getTopRatedShowLists} />
  </Box>
  );
};

export default TopRated;
