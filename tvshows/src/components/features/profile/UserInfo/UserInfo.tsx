import { fetcher } from "@/fetchers/fetcher";
import { uploadProfilePhoto } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { WatchList } from "../../watchlist/Planner/WatchList";
import { UploadPhotoModal } from "./UploadPhotoModal";

export const UserInfo = () => {
  const {
    data: userResponse,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR(swrKeys.user, { fetcher });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { trigger: triggerUploadProfilePhoto } = useSWRMutation(
    swrKeys.register,
    uploadProfilePhoto,
    {
      onSuccess: () => {
        mutate(swrKeys.user);
        onClose();
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

  if (!userResponse) {
    return;
  }

  const { user: userData } = userResponse;

  return (
    <Box width="100%" mr={{ base: "0", md: "0", lg: "250px" }}>
      <Flex
        overflow="hidden"
        borderRadius="cardRadius"
        width="100%"
        alignItems="center"
        direction="column"
        gap={5}
      >
        <Image
          fallbackSrc="/images/placeholder_user.jpg"
          src={userData.image_url}
          alt={
            userData.image_alt
              ? userData.image_alt
              : "Photo may not be available"
          }
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
        <Flex gap={2}>
          <WatchList />
          <IconButton
            icon={<AttachmentIcon />}
            aria-label="upload photo"
            variant="close"
            onClick={onOpen}
          ></IconButton>
        </Flex>
      </Flex>

      <UploadPhotoModal
        isOpen={isOpen}
        onClose={onClose}
        triggerUpload={triggerUploadProfilePhoto}
      />
    </Box>
  );
};
