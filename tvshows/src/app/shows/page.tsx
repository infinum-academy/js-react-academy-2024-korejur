"use client";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { ShowsList } from "@/components/shared/ShowsList/ShowsList";
import { Flex } from "@chakra-ui/react";

const AllShows = () => {
  return (
    <Flex justifyContent="center">
      <AuthRedirect to="/login" condition="loggedOut" />
      <ShowsList route="/api/shows" getter={true} />
    </Flex>
  );
};

export default AllShows;
