import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import { WatchList } from "../../watchlist/Planner/WatchList";
import { uploadProfilePhoto } from "@/fetchers/mutators";
import useSWRMutation from "swr/mutation";

export const UserInfo = () => {

  const {
    data: userResponse,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR(swrKeys.user, { fetcher });

  const { trigger: triggerUploadProfilePhoto } = useSWRMutation(
    swrKeys.register,
    uploadProfilePhoto,
    {
      onSuccess: () => {
        mutate(swrKeys.user);
      },
      onError: () => {
        console.error("Error uploading profile photo");
      },
    }
  );

  if (userError) {
    return <div>Oops, something went wrong...</div>;
  }

  if (userIsLoading) {
    return <Spinner />;
  }

  const { user: userData } = userResponse;

  userResponse.image_url = 'C://fakepath//tv-shows-background.jpg'

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
        
        <Flex direction="column" gap={1}>
          <Input
            type="file"
            placeholder="Upload photo"
          />
          <Button variant="close" onClick={() => {
            triggerUploadProfilePhoto(userResponse)
          }}>
            Upload
          </Button>
        </Flex>

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
