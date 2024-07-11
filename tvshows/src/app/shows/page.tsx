'use client'
import { ShowsList } from '@/components/shared/ShowsList/ShowsList';
import { getShowLists } from '@/fetchers/show';
import { Box } from '@chakra-ui/react';

const AllShows = () => {
  
  return (
    <Box flex="1" p="4" display="flex" justifyContent="center">
    <ShowsList route='/api/shows' getter={getShowLists} />
  </Box>
  );
};

export default AllShows;
