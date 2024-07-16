"use client";
import { ShowsList } from "@/components/features/shows/ShowsList/ShowsList";
import { Flex } from "@chakra-ui/react";

const AllShows = () => {
  return (
    <Flex justifyContent="center">
      <ShowsList route="/api/shows" getter={true} />
    </Flex>
  );
};

export default AllShows;
