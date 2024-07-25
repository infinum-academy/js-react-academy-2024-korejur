import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { WatchList } from "../../watchlist/Planner/WatchList";

export const UserInfo = () => {
  const {
    data: userResponse,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR(swrKeys.user, { fetcher });

  if (userIsLoading) {
    return <Spinner/>
  }

  if (userError) {
    return <div>Oops, something went wrong...</div>;
  }

  const { user: userData } = userResponse;

  return (
    <Box width="100%">
      <Flex
        overflow="hidden"
        borderRadius="cardRadius"
        width="100%"
        alignItems="center"
        direction="column"
        gap={5}
      >
        <Image
          src={userData.image_url}
          alt={
            userData.image_alt
              ? userData.image_alt
              : "Photo may not be available"
          }
          fallbackSrc="/images/placeholder.jpg"
          boxSize={{ base: "200px", md: "300px" }}
          borderRadius="full"
          objectFit="cover"
        />
        <Box textAlign="center">
          <Text textStyle="bodyBold">
            {userData.email.split("@")[0].toUpperCase()}
          </Text>
          <Text textStyle="smallCaption">{userData.email}</Text>
        </Box>
        <WatchList />
      </Flex>
    </Box>
  );
};
