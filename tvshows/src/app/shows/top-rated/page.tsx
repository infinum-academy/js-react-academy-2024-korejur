"use client";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { ShowsList } from "@/components/shared/ShowsList/ShowsList";
import { Flex } from "@chakra-ui/react";

const TopRated = () => {
  return (
    <Flex justifyContent="center">
      <AuthRedirect to="/login" condition="loggedOut" />
      <ShowsList route="/api/shows/top-rated" getter={false} />
    </Flex>
  );
};

export default TopRated;
