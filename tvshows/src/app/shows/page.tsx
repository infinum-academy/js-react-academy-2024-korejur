"use client";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { ShowsList } from "@/components/shared/ShowsList/ShowsList";
import { swrKeys } from "@/fetchers/swrKeys";
import { Flex } from "@chakra-ui/react";

const AllShows = () => {
  return (
    <Flex justifyContent="center">
      <AuthRedirect to="/login" condition="loggedOut" />
      <ShowsList route={swrKeys.shows}/>
    </Flex>
  );
};

export default AllShows;
