"use client";
import { UserInfo } from "@/components/features/profile/UserInfo/UserInfo";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { Flex } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Flex justifyContent="center">
          <AuthRedirect to="/login" condition="loggedOut" />
          <UserInfo/>
    </Flex>
  );
};

export default Profile;
