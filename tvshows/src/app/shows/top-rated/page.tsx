"use client";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { ShowsList } from "@/components/features/shows/ShowsList/ShowsList";
import { swrKeys } from "@/fetchers/swrKeys";
import { Flex } from "@chakra-ui/react";

const TopRated = () => {
  return (
    <Flex justifyContent="center">
      <AuthRedirect to="/login" condition="loggedOut" />
      <ShowsList route={swrKeys.top_rated}/>
    </Flex>
  );
};

export default TopRated;
